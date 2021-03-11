import {Schema, Model, model, Document} from "mongoose"
import { status } from "../routes/user/types"

export interface Channel {
    _id_: string
    name: string,
    /** is present only when in a mgc */
    topic?: string,
    /** is present only when in a mgc */
    mgc?: string,
    /** is only present in case of a group dm or a dm. Isn't present on MGC or anything */
    members?: string[]
}


export type _ChannelCSHC = Channel & Document

const ChannelCSH = new Schema<_ChannelCSHC, Model<_ChannelCSHC>, Channel>({
    _id_: {unique: true, type:"String"},
    name:"String",
    topic: {required:false, type:String},
    members: ["string"],
    mgc: "string"
})


export const ChannelMod = model("Channels", ChannelCSH)