import { PreviewUser } from "../user/types"

export type ReturnMsgHis = {
    _id_: string,
    messages: {
        [key:string]: {
            _id_:string
            content: string,
            date: Date,
            author: PreviewUser,
            channelId: string,
            /** url v */
            attachment?: string
        }
    }
}

export type returnChan = {
    _id_:string,
    name:string,
    topic?: string,
    mgc?:string,
    members?:PreviewUser[],
    otherMembers:PreviewUser[]
}
