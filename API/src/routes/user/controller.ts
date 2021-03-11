import {Router, Request, Response} from "express"
import {GetPublicUser} from "./handler"
import idRouter from "./id/controller"

const router = Router()

router.use('/:id(\\d+)/', async (req:Request<{id:string}>, res:Response, next) => {
    try {
        req.UserToGet = await GetPublicUser(req.params.id, req.User)
        next()
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})


router.use("/:id(\\d+)/", idRouter)


export = router