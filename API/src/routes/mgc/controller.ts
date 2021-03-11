import {Router, Request, Response} from "express"
import { MGCMod } from "../../models/MGC"
import { GetPreviewUser } from "../user/handler"


const router = Router()

router.get('/:id(\\d+)/', async (req:Request<{id:string}>, res:Response) => {
    const mcg = await MGCMod.findOne({
        _id_: req.params.id
    })
    if (!mcg.Members.includes(req.User._id_)) throw "Not Authorized"

    res.send(mcg.toObject())
})

router.get('/:id(\\d+)/members', async (req:Request<{id:string}>, res:Response) => {
    const mcg = await MGCMod.findOne({
        _id_: req.params.id
    })
    if (!mcg.Members.includes(req.User._id_)) throw "Not Authorized"

    let members = []

    for (let member of mcg.Members) {
        members.push(await GetPreviewUser(member, req.User._id_))
    }

    res.send({members: members})
})


export = router