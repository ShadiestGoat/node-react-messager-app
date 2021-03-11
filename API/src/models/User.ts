import {Schema, Model, model, Document, SchemaDefinition} from "mongoose"

export interface IUser {
    rawUsername: string,
    password: string,
    email:string,
    _id_: string,
    realName: string,
    tutor: string
}

export type _IUserSH = IUser & Document

const IUserSH = new Schema<_IUserSH, Model<_IUserSH>, IUser>({
    _id_: {unique:true, type:"String"},
    rawUsername: {unique: true, type: "String"},
    email: "String",
    password: "String",
    realName: "String",
    tutor: "String"
})


export const IUserMod = model("AuthUsers", IUserSH)

