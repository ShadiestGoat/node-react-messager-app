import {IDUserMod, IDUser, _IDUserSH} from "../models/IDUser"
import {MGC, MGCMod} from "../models/MGC"
import { Channel, ChannelMod } from "../models/Channel"
import { MessagesBCMod } from "../models/BackupMessages"
import { MessagesMod, Messages } from "../models/Messages"
import { Document } from "mongoose"


export async function UpdateUser(user:IDUser | Document<IDUser>) {
    let findoc;
    findoc = 'toObject' in user ? user.toObject() : user
    if (user instanceof Document) {
        delete findoc.__v
        delete findoc._id
    }
    await IDUserMod.updateOne({_id_: findoc._id_}, findoc ?? user)
}

export async function UpdateMGC(MGC:MGC | Document<MGC>) {
    let findoc;
    findoc = 'toObject' in MGC ? MGC.toObject() : MGC
    if (MGC instanceof Document) {
        delete findoc.__v
        delete findoc._id
    }
    await MGCMod.updateOne({_id_: findoc._id_}, findoc ?? MGC)
}

export async function UpdateChannel(Channel:Channel | Document<Channel>) {
    let findoc;
    findoc = 'toObject' in Channel ? Channel.toObject() : Channel
    if (Channel instanceof Document) {
        delete findoc.__v
        delete findoc._id
    }
    await ChannelMod.updateOne({_id_: findoc._id_}, findoc ?? Channel)
}

export async function UpdateMsgModel(Msg:Messages | Document<Messages>) {
    let findoc;
    findoc = 'toObject' in Msg ? Msg.toObject() : Msg
    if (Msg instanceof Document) {
        delete findoc.__v
        delete findoc._id
    }
    await MessagesMod.updateOne({_id_: findoc._id_}, findoc ?? Msg)
    await MessagesBCMod.updateOne({_id_: findoc._id_}, findoc ?? Msg)
}



export function SHtoIDUser(User:_IDUserSH):IDUser {
    return {
        blocked: User.blocked,
        friendRequestsSent:User.friendRequestsSent,
        IDDM: User.IDDM,
        _id_: User._id_,
        friendRequests: User.friendRequests,
        friends: User.friends,
        notes: User.notes,
        pfp: User.pfp,
        reported: User.reported,
        reportedBy: User.reportedBy,
        status: User.status,
        token: User.token,
        username: User.username,
        year: User.year,
        KnownNames: User.KnownNames,
        nameRequests: User.nameRequests,
        nameRequestsSent: User.nameRequestsSent
    }
}

export function GenID() {
    const idGen = () => {
        return Math.floor(Math.random() * 10).toString()
    }
    return idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen() +
           idGen()
}