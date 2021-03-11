import { IDUser, IDUserMod } from "../../models/IDUser";
import { PreviewUser, PublicUser } from "./types";


export async function GetPublicUser(_id_:string, user:IDUser):Promise<PublicUser> {
    if (_id_ == user._id_) {
        let mutuals:PreviewUser[] = []
        for (let friend in user.friends) {
            mutuals.push(await GetPreviewUser(_id_, _id_))
        }
        return {_id_:_id_, self:true, mutualFriends:mutuals, username:user.username, pfp:user.pfp, note:(user.notes ?? {})[_id_], status:user.status, blockedBySelf: false, friend:false, friendRequestSent:false, reportedByMe:[], }
    }
    const userToGet = await IDUserMod.findOne({_id_:_id_})
    if (!userToGet) throw "user not found"
    if (user.blocked.includes(user._id_)) throw "You are blocked"

    let mutual:PreviewUser[] = []

    // idk how to spell ok
    for (let friend of userToGet.friends) {
        if (user.friends.includes(friend)) mutual.push(await GetPreviewUser(friend,user._id_))
    }

    // listen i know no one is able to read this, not just because no one is watching, butu also bc like im streaming code, but this is the most mediocrrr tea ive had
    // it slike luke worm (not worm and not cold not anything really), and it doesnt taste bad, but like it taste not good...
    // anyways ive figure out how to store the id. How about, instad of stroing the friends list as a list, we store as an obj of id:channelId?
    // im a fuckin genius ngl

    return {_id_:_id_,
            username: userToGet.username,
            status:userToGet.status,
            pfp:userToGet.pfp,
            note:(user.notes ?? {})[_id_] ?? "",
            mutualFriends: mutual,
            DMID: (user.IDDM  ?? {})[_id_],
            blockedBySelf: (user.blocked ?? []).includes(_id_),
            friend: (user.friends ?? []).includes(_id_),
            friendRequestSent: (user.friendRequestsSent ?? []).includes(_id_),
            reportedByMe: (user.reported ?? {})[_id_],
            self: false
        }
}

export async function GetPreviewUser(_id_:string, idOfGetter:string):Promise<PreviewUser> {
    const userToGet = await IDUserMod.findOne({_id_:_id_})
    if (!userToGet) throw "user not found"
    if (!userToGet.IDDM[idOfGetter]) {
        // TODO Make new channel
    }

    return {_id_:_id_, username:userToGet.username, status:userToGet.status, pfp:userToGet.pfp, DMID: userToGet.IDDM[idOfGetter], friend:userToGet.friends.includes(_id_)}
}