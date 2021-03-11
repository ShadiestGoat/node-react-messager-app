import {PublicUser} from "../types"
import { IDUser, IDUserMod } from "../../../models/IDUser"
import {SHtoIDUser, UpdateUser} from "../../tools"
import {IUserMod} from "../../../models/User"


export async function report(idToReport:string, user:IDUser, reason:string) {
    const User = await IDUserMod.findOne({_id_: idToReport})
    if (!User) throw "User Not Found"
    if (User.blocked.includes(user._id_)) throw "Can't report a blocked User"
    const reason_:[Date, string] = [new Date(), reason]
    User.reportedBy[user._id_].push(reason_)
    user.reported[idToReport].push(reason_)
    await UpdateUser(User)
    await UpdateUser(user)
}

export async function block(IdToBlock:string, user:IDUser) {
    const UserToBlock = SHtoIDUser(await IDUserMod.findOne({_id_:IdToBlock}))
    if (!UserToBlock) throw "User Not Found"
    if (UserToBlock._id_ == user._id_) throw "Can't block yourself"
    if (UserToBlock.status == "admin") throw "Can't block an admin"
    if (UserToBlock.status == "teacher") await report(UserToBlock._id_, user, "Blocked a teacher")
    if (user.status == "teacher" || user.status == "admin") await report(UserToBlock._id_, user, "Staff blocked a user")
    user.blocked.push(UserToBlock._id_)
    await removeFriend(UserToBlock, user)
}

export async function addFriend(IdToAdd:string, user:IDUser) {
    if (user.blocked.includes(IdToAdd)) throw "The user is blocked"
    let ToAdd = SHtoIDUser(await IDUserMod.findOne({_id_:IdToAdd}))
    if (ToAdd.blocked.includes(user._id_)) throw "You are blocked"

    user.friendRequestsSent.push(IdToAdd)
    ToAdd.friendRequests.push(IdToAdd)

    await UpdateUser(user)
    await UpdateUser(ToAdd)
}

export async function removeFriend(User1:IDUser, User2:IDUser) {
    if (User1.friends.includes(User2._id_)) {
        User1.friends.splice(User1.friends.indexOf(User2._id_),1)
        User2.friends.splice(User2.friends.indexOf(User1._id_),1)
    }
    if (User1.friendRequests.includes(User2._id_)) {
        User2.friendRequestsSent.splice(User2.friendRequestsSent.indexOf(User1._id_),1)
        User1.friendRequests.splice(User1.friendRequests.indexOf(User2._id_),1)
    }
    if (User1.friendRequestsSent.includes(User2._id_)) {
        User1.friendRequestsSent.splice(User1.friendRequestsSent.indexOf(User2._id_),1)
        User2.friendRequests.splice(User2.friendRequests.indexOf(User1._id_),1)
    }
    await UpdateUser(User1)
    await UpdateUser(User2)
}

export async function makeNameRequest(userWhosName:IDUser, user:IDUser):Promise<{name:string, tutor:string} | {status: "success"}> {
    if (user.status == "student") throw "Not Authorised"
    if (userWhosName.status == "admin" || userWhosName.status == "teacher") 

    if (user.status == 'admin') {
        return await GetName(userWhosName._id_)
    } else {
        if (user.KnownNames.includes(userWhosName._id_)) {
            return await GetName(userWhosName._id_)
        }
        userWhosName.nameRequests.push(user._id_)
        user.nameRequestsSent.push(user._id_)
        await UpdateUser(userWhosName)
        await UpdateUser(user)
        return {status: "success"}
    }
}

export async function acceptNameRequest(NameToGet:IDUser, Getter:IDUser) {
    if (Getter.KnownNames.includes(NameToGet._id_)) return await GetName(NameToGet._id_)
    if (NameToGet.nameRequests.includes(Getter._id_)) {
        const name = await GetName(NameToGet._id_)
        Getter.KnownNames.push
    }
}

export async function GetName(_id_:string):Promise<{name:string, tutor:string}> {
    const person = await IUserMod.findOne({_id_:_id_})
    return {name:person.realName, tutor: person.tutor }
}