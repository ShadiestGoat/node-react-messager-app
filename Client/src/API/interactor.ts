import axios from "axios"
import { Channel, IDUser, Messages, PublicUser, successStat } from "./APItypes"
import { endpoint } from "./ws"

export class API {
    id: string
    token: string
    base: string
    constructor (id:string, token:string) {
        this.id = id
        this.token = token
        this.base = endpoint + "api"
    }

    async getUser(id:string) {
        return await this.makeRequest<PublicUser>("/users/" + id)
    }
    async getSelf() {
        return await this.makeRequest<IDUser>("/self/")
    }
    async getMessages(id:string) {
        return await this.makeRequest<Messages>("/channels/" + id + "/messages/")
    }
    async getChannel(id:string) {
        return await this.makeRequest<Channel>("/channels/" + id)
    }

    async block(id:string) {
        return await this.makeRequest<successStat>("/users/" + id + "/block", undefined, true)
    }
    async OpenDM(id:string) {
        return await this.makeRequest<Channel>('/users/' + id + "/opendm", undefined, true)
    }
    private getRequestHeaders() {
        return {
                id: this.id,
            token: this.token,
            Accept: "application/json"
        }
    }

    private async makeRequest<T=undefined>(path:string, postData?:any, post:boolean = false):Promise<T> {
        if (postData || post) {
            const resp = await axios.post<T | {error:string}>(this.base+path, postData, {headers: this.getRequestHeaders()})
            if ('error' in resp.data) {
                console.error((resp.data as any).error)
                throw (resp.data as any).error
            }
            return resp.data
        }
        const resp = await axios.get<T | {error:string}>(this.base + path, {headers: this.getRequestHeaders()})
        if ('error' in resp.data) {
            console.error((resp.data as any).error)
            throw (resp.data as any).error
        }
        return resp.data
    }
}