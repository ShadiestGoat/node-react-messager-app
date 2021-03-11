import { IDUser } from "../../models/IDUser"
import { MGC, MGCMod } from "../../models/MGC"
import { GenID, UpdateMGC, UpdateMsgModel, UpdateUser } from "../tools"
import { ChannelMod, Channel } from "../../models/Channel"
import { Message, Messages, MessagesMod } from "../../models/Messages"
import { MessagesBCMod } from "../../models/BackupMessages"
import { GetPreviewUser } from "../user/handler"
import { ReturnMsgHis } from "./types"

async function genUniqueChanId(idToTest:string) {
    const chan = await ChannelMod.findOne({_id_:idToTest})
    if (chan) {
        await genUniqueChanId(GenID())
    } else {
        return idToTest
    }
}


async function genUniqueMsgId(channelId:string, idToTest:string) {
    const chan = await MessagesMod.findOne({_id_:channelId})
    if (!chan) throw "channel not found"
    if (idToTest in (chan.messages ?? {})) {
        await genUniqueMsgId(channelId, GenID())
    } else {
        return idToTest
    }
    // if (chan) {
    //     await genUniqueMsgId(GenID())
    // } else {
    //     return idToTest
    // }
}

export async function createNewChannel(options: MGC | {User1:IDUser, User2:IDUser}):Promise<Channel> {
    if ("User1" in options && "User2" in options) {
        const id = await genUniqueChanId(GenID())
        const chan:Channel = {
            _id_: id,
            name: "DM",
            members: [options.User1._id_, options.User2._id_]
        }

        const chanMod = await (new ChannelMod(chan)).save()

        const Msg:Messages = {
            _id_: chan._id_,
            messages: {}
        }
        await (new MessagesMod(Msg)).save()
        await (new MessagesBCMod(Msg)).save()

        options.User1.IDDM[options.User2._id_] = id
        options.User2.IDDM[options.User1._id_] = id

        console.log(options)

        await UpdateUser(options.User2)
        await UpdateUser(options.User1)

        return {
            _id_:chanMod._id_,
            name: chanMod.name,
            members: chanMod.members,
            mgc: chanMod.mgc,
            topic: chanMod.topic
        }

    } else {
        const id = await genUniqueChanId(GenID())
        options.Channels.push(id)
        const chan:Channel = {
            _id_: id,
            name: "DM"
        }
        const chanMod = await (new ChannelMod(chan)).save()
        await UpdateMGC(options)
        return {
            _id_:chanMod._id_,
            name: chanMod.name,
            members: chanMod.members,
            mgc: chanMod.mgc,
            topic: chanMod.topic
        }
    }
}

export async function FetchMessages(channel:Channel, user:IDUser):Promise<ReturnMsgHis> {
    if (user.status != "admin") {
        if (channel.members) {
            if (!channel.members.includes(user._id_)) throw "Not Authorized"
        }
        if (channel.mgc) {
            const mgc = await MGCMod.findOne({_id_:channel.mgc})
            if (!mgc) throw "No MGC"
            if (!mgc.Members.includes(user._id_)) throw "N"
        }
    }
    let msgs = (await MessagesMod.findOne({_id_:channel._id_})).toObject()
    let msgss:ReturnMsgHis = {
        _id_: msgs._id_,
        messages: {}
    }
    for (let msg in msgs.messages) {
        msgss.messages[msg] = (msgs.messages[msg] as any)
        msgss.messages[msg].author = await GetPreviewUser(msgs.messages[msg].author, user._id_)
    }

    return msgs ? msgss : {_id_:channel._id_, messages:{}}
}


export async function SendMessage(channel:Channel, author:IDUser, content:string):Promise<Message> {
    if (!content) throw "Can't have empty message"
    const msgId = await genUniqueMsgId(channel._id_, GenID())
    const msg:Message = {
        _id_: msgId,
        author: author._id_,
        channelId: channel._id_,
        content: content,
        date: new Date(),
    }

    const msgHis = await MessagesMod.findOne({_id_:channel._id_})
    if (!msgHis.messages) msgHis.messages = {}
    msgHis.messages[msgId] = msg

    await UpdateMsgModel(msgHis)
    return msg
}