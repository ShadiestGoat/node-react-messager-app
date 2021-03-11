import {Schema, Model, model, Document} from "mongoose"
import { status } from "../routes/user/types"
import {ReportedReasons} from "../routes/user/id/types"

export interface IDUser {
    _id_: string, //_id_ because __id & _id & id are all taken by mongoose
    status: status,
    pfp: string, //base64 encoded image
    token: string,
    username: string
    IDDM: {
        [key:string]: string
    },
    friends: string[]
    /** userId:[Date when reported, reason][] */
    reported: {
        [key:string]: ReportedReasons
    },
    reportedBy: {
        [key:string]: ReportedReasons
    }
    blocked: string[],
    notes: {
        [key:string]: string
    },
    year: number,
    friendRequests: string[],
    friendRequestsSent: string[]
    nameRequests?: string[],
    nameRequestsSent?: string[]
    KnownNames: string[]
}

export type _IDUserSH = IDUser & Document

const IDUserSH = new Schema<_IDUserSH, Model<_IDUserSH>, IDUser>({
    _id_: {unique: true, type:"String"},
    status: "String",
    pfp: "String",
    token: "String",
    year: "Number",
    username: "String",
    friends: ["string"],
    friendRequests: ["string"],
    friendRequestsSent: ["string"],
    blocked: ["String"],
    IDDM: Schema.Types.Mixed,
    notes: Schema.Types.Mixed,
    reported: Schema.Types.Mixed,
    reportedBy: Schema.Types.Mixed,
    KnownNames: ["String"],
    nameRequests: {required:false, type: ["string"]},
    nameRequestsSent: {required:false, type: ["string"]}
})


export const IDUserMod = model("IDUsers", IDUserSH)