import {Router, Request, Response} from "express"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"
import { ChannelBCMod } from "../../../models/BackupMapOfChannels"
import { ChannelMod } from "../../../models/Channel"
import { IDUserMod } from "../../../models/IDUser"
import { createNewChannel } from "../../channel/handler"
import { SHtoIDUser, UpdateUser } from "../../tools"
import { GetPreviewUser, GetPublicUser } from "../handler"
import { acceptNameRequest, addFriend, block, makeNameRequest, removeFriend, report } from "./handler"

const router = Router()


router.get('/', async (req:Request, res:Response) => {
    res.send(await GetPublicUser(req.UserToGet._id_, req.User))
})


router.post("/report", async (req:Request<undefined, {status:string}, {reason?:string}>, res) => {
    if (!req.UserToGet) throw "Bad Api Code"
    if (!req.body.reason) throw "You need a reason!"
    await report(req.UserToGet._id_, req.User, req.body.reason)
    res.send({status: "success"})
})

router.post('/opendm', async (req, res) => {
    if (!req.UserToGet) throw "Bad Api Code"
    if (Object.keys(req.User.IDDM).includes(req.UserToGet._id_)) {
        const chan = await ChannelMod.findOne({_id_:req.User.IDDM[req.UserToGet._id_]})
        res.send(chan.toObject())
        return
    }
    const user2 = await IDUserMod.findOne({
        _id_: req.UserToGet._id_,
    })

    const chan = await createNewChannel({User1:req.User, User2:SHtoIDUser(user2)})
    res.send(chan)
})

router.post('/block', async (req:Request, res:Response) => {
    if (!req.UserToGet) throw 'Bad Api Code'
    await block(req.UserToGet._id_, req.User)
    res.send({status:"success"})
})

router.post('/note', async (req:Request, res:Response) => {
    if (!req.UserToGet) throw 'Bad Api Code'
    req.User.notes[req.UserToGet._id_] = req.body.note || ""
    await UpdateUser(req.User)
    res.send(await GetPreviewUser(req.UserToGet._id_, req.User._id_))
})

router.get('/note', async (req:Request, res:Response) => {
    if (!req.UserToGet) throw 'Bad Api Code'
    res.send({note: (req.User.notes[req.UserToGet._id_] || "")})
})

router.post('/addFriend', async (req:Request, res:Response) => {
    if (!req.UserToGet) throw 'Bad Api Code'
    await addFriend(req.UserToGet._id_, req.User)
    res.send({status: "success"})
})

router.post('/removeFriend', async (req:Request, res:Response) => {
    if (!req.UserToGet) throw 'Bad Api Code'
    const friendToYeet = await IDUserMod.findOne({_id_:req.UserToGet._id_})
    await removeFriend(SHtoIDUser(friendToYeet), req.User)
    res.send({status:"success"})
})

router.post('/makeNameRequest', async (req, res) => {
    if (!req.UserToGet) throw "Bad Api Code"
    const userToGet = await IDUserMod.findOne({_id_:req.UserToGet._id_})
    res.send(await makeNameRequest(userToGet,req.User))
})

router.get('/name', async (req:Request, res:Response) => {
    if (!req.UserToGet) throw 'Bad Api Code'
    if (req.User.KnownNames.includes(req.UserToGet._id_)) {
        res.send({name: req.User.KnownNames[req.UserToGet._id_]})
    } else {
        throw "Name Unknown"
    }
})

router.post('/acceptNameRequest', async (req:Request, res:Response) => {
    if (!req.UserToGet) throw 'Bad Api Code'
    const _userToGet = await IDUserMod.findOne({_id_:req.UserToGet._id_})
    const userToGet = SHtoIDUser(_userToGet)
    await acceptNameRequest(userToGet , req.User)
    res.send({status:"success"})
})

export = router