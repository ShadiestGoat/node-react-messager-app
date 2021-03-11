import { Router } from "express"
import {Validator} from "./middleware"
import userController from "./user/controller"
import selfRouter from "./self/controller"
import channelRouter from "./channel/controller"
import msgRouter from "./mgc/controller"

const router = Router()

router.use(Validator)
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

router.use("/users/", userController)
router.use('/self/', selfRouter)
router.use('/channels/', channelRouter)
router.use('/mgcs/', msgRouter)

export = router