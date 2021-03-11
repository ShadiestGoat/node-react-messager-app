import {Router, Request, Response} from "express"
import {ChannelMod} from "../../models/Channel"
import { GetPreviewUser } from "../user/handler"
import { SendMessage, FetchMessages } from "./handler"
import { returnChan } from "./types"

const router = Router()

router.get('/:id(\\d+)/', async (req:Request<{id:string}>, res:Response) => {
    try {
        const chan = await ChannelMod.findOne({_id_: req.params.id})
        if (!chan) throw "Not Found"
        let chanR:returnChan = {
            _id_: chan._id_,
            name: chan.name,
            otherMembers: [],
            members: [],
            mgc: chan.mgc,
            topic: chan.topic,
        }
        if (chan.name == "DM") {
            for (let mem of chan.members) {
                let usr = await GetPreviewUser(mem, req.User._id_)
                chanR.members.push(usr)
                if (mem == req.User._id_) continue
                chanR.otherMembers.push(usr)
            }
        }
        res.send(chanR)
    } catch (err) {
        res.send({error: err.toString()})
    }
})

router.get('/:id(\\d+)/messages', async (req:Request<{id:string}>, res:Response) => {
    try {
        const chan = await ChannelMod.findOne({_id_: req.params.id})
        if (!chan) throw "Channel Not Found"
        const msgs = await FetchMessages(chan, req.User)
        res.send(msgs)
    } catch (err) {
        res.send({error: err.toString()})
    }
})




export = router