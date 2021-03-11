import { ReportedReasons } from "./id/types";

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

export type status = "teacher" | "admin" | "student"