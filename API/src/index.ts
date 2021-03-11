import mongo from "mongoose"
import {Connection} from "mongoose"
import express from 'express'
import {Application, Response, Request} from 'express'
import config from "./config/config"
import indexRouter from "./routes/indexRouter"
import {urlencoded, json as BodyJson} from "body-parser"
import {Server as HTTPServer} from "http"
import {Server, Socket} from "socket.io"
import { IDUser, IDUserMod } from "./models/IDUser"
import { SHtoIDUser } from "./routes/tools"
import { ChannelMod } from "./models/Channel"
import { ChannelBCMod } from "./models/BackupMapOfChannels"
import {MGCMod} from "./models/MGC"
import { SendMessage } from "./routes/channel/handler"
import listEndPoints from "express-list-endpoints"
import cors from 'cors';


const MongoDBendPoint = "mongodb://" + config.db.Username + ":" + config.db.Password + "@" + config.db.IP + ":27017/" + config.db.DB + "?readPreference=primary&appname=API%20Local&ssl=false?authSource=" + config.db.DB

const app:Application = express()

mongo.connect(MongoDBendPoint, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:true, useCreateIndex: true})

app.use(urlencoded({ extended: true }))
app.use(BodyJson())
app.use(cors());


app.use((err, req, res, next) => {
    res.send({error:err.toString()})
})

const map = {
    "47615026313301367274": "c87e883f37335a08189b9c9de1ced36a6a2520f3771c946a366eec6cadfa5460",
    "20424715460878422049": "544709652e868f2cb7dc8bb95ff6bdaad9002c4109501be3a32c89244cf4e773"
}

app.get('/app/:id(\\d+)', async (req, res) => {
    res.send(`
    <head>
    <title>Socket.IO chat</title>
    <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #input:focus { outline: none; }
      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
        <input id="input" autocomplete="off" />
        <input id="reciever" autocomplete="off" />

      <button>Send</button>
    </form>
    <script src="/ws/socket.io.js"></script>
    <script>
    var socket = io("/?id=${req.params.id}&token=${map[req.params.id.toString()]}", {path: "/ws"});


    var form = document.getElementById('form');
    var input = document.getElementById('input');

        form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value && reciever.value) {
            socket.emit('SendMessage', {reciever:reciever.value, content:input.value});
            input.value = '';
        }
        });
    socket.on('RecieveMessage', (msg) => {
        console.log(msg)
        if (msg.error) throw msg.error.toString()
    })
    socket.on('error', (err) => {
        console.error(err)
    })
    </script>
  </body>`
  )
})

app.use("/api/", indexRouter)



const server = app.listen(12322, () => {
    console.log('App online 12332')
})

const io = new Server(server, {path:'/ws', cors: {
    origin: "*"
}})


io.use((socket, next) => {
    const req = socket.handshake
    IDUserMod.findOne({token: req.query.token.toString(), _id_:req.query.id.toString()}).exec().then((user) => {
        if (!user) {
            next(new Error("Not Authorized"))
            return
        }
        socket.join(user._id_)
        next()
    })
    return
})

class User {
    u:IDUser
    token:string
    _id_:string
    constructor(token:string, _id_:string) {
        this.token = token,
        this._id_ = _id_
    }
    async init() {
        const u = await IDUserMod.findOne({token:this.token, _id_:this._id_})
        this.u = SHtoIDUser(u)
    }
}


io.on('connection', async (socket:Socket) => {
    const u = new User(socket.handshake.query.token.toString(), socket.handshake.query.id.toString())
    await u.init()
    socket.on('SendMessage', async ({ reciever, content }) => {

        const chan = await ChannelMod.findOne({_id_: reciever})
        try {
            if (!chan) throw "no such channel exists"
            const msg = await SendMessage(chan, u.u, content)
            let members = []
            if (chan.mgc) {
                const mgc = await MGCMod.findOne({_id_:chan.mgc})

                for (let mem of mgc.Members) {
                    members.push(mem)
                }
            } else {
                if (!chan.members) throw "Bad API code"
                for (var mem of chan.members) {
                    members.push(mem)
                }
            }
            socket.emit('RecieveMessage', msg)
            console.log(msg)
            for (let mem of members) {
                socket.broadcast.to(mem).emit('RecieveMessage', msg)
            }
        } catch (err) {
            console.error(err)
            socket.emit('error', {error: err})
        }
    })
});

