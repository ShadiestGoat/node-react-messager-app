import {Router, Request, Response} from "express"
import { IDUser } from "../../models/IDUser"
import {GetPreviewUser, GetPublicUser} from "../user/handler"
import { PreviewUser } from "../user/types"

const router = Router()

router.get('/', async (req:Request<{}, Omit<IDUser, "ws" | "reportedBy" | "friends"> & {friends: PreviewUser[]}>, res) => {
    let friends:PreviewUser[] = []
    for (let id of req.User.friends) {
        friends.push(await GetPreviewUser(id, req.User._id_))
    }
    res.send(
        {
            _id_: req.User._id_,
            status: req.User.status,
            pfp: req.User.pfp,
            username: req.User.username,
            token:req.User.token,
            IDDM: req.User.IDDM,
            friends: friends,
            friendRequestsSent: req.User.friendRequestsSent,
            KnownNames: req.User.KnownNames,
            blocked: req.User.blocked,
            friendRequests: req.User.friendRequests,
            notes: req.User.notes,
            reported: req.User.reported,
            year: req.User.year,
            nameRequests: req.User.nameRequests,
            nameRequestsSent: req.User.nameRequestsSent
        }
    )
})

export = router