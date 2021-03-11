import {Schema, Model, model, Document, SchemaDefinition} from "mongoose"
import { Messages, _MessagesSH } from "./Messages"

const MessagesBCSH = new Schema<_MessagesSH, Model<_MessagesSH>, Messages>({
    _id_: {unique: true, type:"String"},
    messages: Schema.Types.Mixed
})


export const MessagesBCMod = model("MessagesBC", MessagesBCSH)