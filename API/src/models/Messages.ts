import {Schema, Model, model, Document, SchemaDefinition} from "mongoose"

export interface Messages {
    _id_: string,
    /** Author id to message content  */
    messages: {
        [key:string]: Message
    }
}

export interface Message {
    _id_:string
    content: string,
    date: Date,
    author: string,
    channelId: string,
    /** url v */
    attachment?: string
}

export type _MessagesSH = Messages & Document

const MessagesSH = new Schema<_MessagesSH, Model<_MessagesSH>, Messages>({
    _id_: {unique: true, type:"String"},

    messages: Schema.Types.Mixed
})


export const MessagesMod = model("Messages", MessagesSH)
