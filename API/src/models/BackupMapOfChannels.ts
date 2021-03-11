import {Schema, Model, model, Document} from "mongoose"
import { status } from "../routes/user/types"

export interface BackupChannelDMMap {
    /** the smaller one */
    _uid_: string
    /** the bigger one */
    _uid_2: string,
    /** id of channel */
    _id_: string
}


export type _BackupChannelDMMap = BackupChannelDMMap & Document

const ChannelCSH = new Schema<_BackupChannelDMMap, Model<_BackupChannelDMMap>, BackupChannelDMMap>({
    _uid_: "string",
    _uid_2: "string",
    _id_: "string"
})


export const ChannelBCMod = model<_BackupChannelDMMap>("ChannelsBC", ChannelCSH)