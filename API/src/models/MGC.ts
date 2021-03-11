import {Schema, Model, model, Document} from "mongoose"
import { status } from "../routes/user/types"

export interface MGC {
    _id_:string
    name: string,
    system: false | "student" | "all" | "teacher",
    /** base 64 encoded icon */
    icon: string,
    madeTime: Date,

    /** a array of channel ids*/
    Channels: string[],
    Members: string[],
}

// lets forget about perms for now

export type _MGCSH = MGC & Document

const MGCSH = new Schema<_MGCSH, Model<_MGCSH>, MGC>({
    _id_: {unique: true, type:"String"},
    name: "String",
    system: Schema.Types.Mixed,
    icon: "String",
    madeTime: Date,

    Channels: ["String"],
    Members: ["String"]
})


export const MGCMod = model("MGCs", MGCSH)