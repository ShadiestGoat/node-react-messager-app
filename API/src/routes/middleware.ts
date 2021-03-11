import { NextFunction, Request, Response } from "express"
import { IDUserMod } from "../models/IDUser";
import { SHtoIDUser } from "./tools";



export function Validator(req:Request, res:Response, next:NextFunction) {
    if (!req.headers.token || !req.headers.id) {
        throw "No token/id"
    }
    IDUserMod.findOne({token: req.headers.token.toString(), _id_:req.headers.id.toString()}).exec().then((user) => {
        if (!user) {res.send({error: "You are un authorized"}); return}
        req.User = SHtoIDUser(user)
        next()
    })
    return
}