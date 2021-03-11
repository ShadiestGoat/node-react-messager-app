export interface PublicUser {
    _id_: string,
    username:string
    status: status,
    pfp: string //base64 encoded image
    mutualFriends:PreviewUser[],
    note:string
    DMID?: string,
    self?: boolean,
    reportedByMe?: ReportedReasons,
    blockedBySelf: boolean,
    friend: boolean
    friendRequestSent: boolean
}

export interface PreviewUser {
    username: string,
    friend: boolean
    pfp: string,
    _id_:string,
    status: status,
    DMID: string,
}

export interface Channel {
    _id_:string,
    name:string,
    topic?: string,
    mgc?:string,
    members?:PreviewUser[],
    otherMembers:PreviewUser[]
}

export interface IDUser {
    _id_: string, //_id_ because __id & _id & id are all taken by mongoose
    status: status,
    pfp: string, //base64 encoded image
    token: string,
    username: string
    IDDM: {
        [key:string]: string
    },
    friends: PreviewUser[]
    /** userId:[Date when reported, reason][] */
    reported: {
        [key:string]: ReportedReasons
    },
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

export interface Message {
    _id_:string
    content: string,
    date: Date,
    author: PreviewUser,
    channelId: string,
}

export interface Messages {
    _id_: string,
    /** Author id to message content  */
    messages: {
        [key:string]: Message
    }
}

export type successStat = {status:"success"}

export type status = "teacher" | "admin" | "student"
export type ReportedReasons = [Date, string][]
