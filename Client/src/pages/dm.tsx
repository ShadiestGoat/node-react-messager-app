import { io, Socket } from "socket.io-client"
import React, {Component, createRef, RefObject} from "react"
import { Channel, IDUser, Message, Messages, PreviewUser } from "../API/APItypes"
import { API } from "../API/interactor"
import { SideBarLeft } from "../components/leftSideBar"
import { QuickProfile } from "../components/username-profile"
import { endpoint } from "../API/ws";
import { Menu,Item, contextMenu,  } from "react-contexify"
import gfm from "remark-gfm"
import ReactMD from "react-markdown"
import remarkExtLinks from "remark-external-links"


import "react-contexify/dist/ReactContexify.css";


export class DMpage extends Component<{id:string, token:string, channlId:string}, {
        API:API,
        self?:IDUser,
        channId:string,
        id:string,
        token:string,
        previewMsg?:any,
        show:any,
        chan?:Channel,
        io:Socket,
        content?:string,
        messages:{
            [key:string]:Messages
        },
        msgElmnt: JSX.Element[],
        userIdContent: string
    }> {
    messagesEndRef:RefObject<any>
    constructor(props:any) {
        super(props)
        const IO = io(endpoint + `?token=${this.props.token}&id=${this.props.id}`, {path:"/ws",  forceNew:true,})
        IO.on('RecieveMessage', async (msg:Omit<Message, "author"> & {author: string}) => {
            await this.NewMessageAdder(msg)
        }).on('error', async (err:Error) => {
            this.setState({
                previewMsg: ""
            })
        })
        this.state = {
            API: new API(this.props.id, this.props.token),
            channId: this.props.channlId,
            id: this.props.id,
            token: this.props.token,
            messages: {},
            io:IO,
            content: "",
            show:(e:any) => {contextMenu.show({id: "ContextMenuUser",event: e,})},
            userIdContent: this.props.id,
            msgElmnt: []
        }
        this.messagesEndRef = createRef()
        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.Block = this.Block.bind(this)
        this.updateChannel = this.updateChannel.bind(this)
        this.NewMessageAdder = this.NewMessageAdder.bind(this)
        this.handleChangeOfUser = this.handleChangeOfUser.bind(this)
        this.ChangeUser = this.ChangeUser.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    messagesMaker() {
        this.setState({
            msgElmnt: Object.keys((this.state.messages[(this.state.channId ?? "")] ?? {messages: {}}).messages).map((msg) =>
            this.addMsgToElmnt(msg))
        })
    }

    private addMsgToElmnt(msg:string, pfp?:string) {
        return (
        <li key={msg} id={msg} className="message row">
            <div className="col-05-f" onContextMenu={this.state.show}>
                <img src={pfp ? pfp : this.state.messages[this.state.channId].messages[msg].author.pfp} alt="pfp" className="pfp"/>
            </div>
            <div className="col message-content">
                <div style={{wordWrap: "break-word", wordBreak: "break-all", flexWrap:"wrap"}} className="MsgContent">
                    <h3> { pfp? this.state.self?.username : this.state.messages[this.state.channId].messages[msg].author.username } </h3>
                    <ReactMD skipHtml={true} disallowedTypes={["heading", "html", "break"]} plugins={[gfm, remarkExtLinks]} children={pfp ? msg : this.state.messages[this.state.channId].messages[msg].content} />
                </div>
            </div>
        </li>
        )
    }

    async componentDidMount() {
        const newApi = new API(this.state.id, this.state.token)
        const msgs = await this.state.API.getMessages(this.state.channId)

        let messages = this.state.messages
        messages[msgs._id_] = msgs

        this.setState({
            API: newApi,
            self:await newApi.getSelf(),
            messages: messages,
            chan: await this.state.API.getChannel(this.state.channId),
        })
        this.messagesMaker()
        this.scrollToBottom()
    }

    async NewMessageAdder(msg:Omit<Message, "author"> & {author: string}) {
        try {
            const newUser = await this.state.API.getUser(msg.author)
            let newMsg:Message = {
                _id_: msg._id_,
                channelId: msg.channelId,
                content: msg.content,
                date: msg.date,
                author: {
                    _id_: msg.author,
                    DMID: msg.channelId,
                    friend: newUser.friend,
                    pfp: newUser.pfp,
                    status: newUser.status,
                    username: newUser.username
                }
            }
            let newMessages = this.state.messages
            if (!newMessages[msg.channelId]) newMessages[msg.channelId] = { _id_: msg.channelId, messages:{} }

            newMessages[msg.channelId].messages[msg._id_] = newMsg

            let msgElmnts = this.state.msgElmnt
            msgElmnts.push(this.addMsgToElmnt(newMsg._id_))
            this.setState({
                previewMsg: "",
                messages: newMessages,
                msgElmnt: msgElmnts
            })

            this.scrollToBottom()
        } catch (err) {
            return err.toString()
        }
    }

    async ChangeUser() {
        const api = new API(this.state.userIdContent, this.props.token)
        const self = await api.getSelf()
        const chanID = (self.IDDM[Object.keys(self.IDDM)[0]] ?? (await api.OpenDM("47615026313301367274"))._id_)
        this.state.io.close()
        const sock = io(endpoint + `?token=${this.props.token}&id=${api.id}`, {path:"/ws",  forceNew:true,})

        sock.on('RecieveMessage', async (msg:Omit<Message, "author"> & {author: string}) => {
            await this.NewMessageAdder(msg)
        }).on('error', async (err:Error) => {
            this.setState({
                previewMsg: ""
            })
        })
        this.setState({
            API: api,
            self: self,
            id: api.id,
            io: sock,
            channId: chanID,
            messages: {},
            userIdContent: api.id,
            previewMsg: "",
            chan: await api.getChannel(chanID),
            content: "",
        })
    }

    handleChangeOfUser(e: any) {
        e.preventDefault()
        this.setState({
            userIdContent: e.target.value,
        });
    }

    sendMessage() {
        if (this.state.content) {
            this.state.io.emit('SendMessage', {reciever:this.state.channId, content:this.state.content.trim()});
            const curContent = this.state.content
            this.setState({
                content: ''
            })
            this.setState({
                previewMsg: (this.addMsgToElmnt(curContent, this.state.self?.pfp ?? "notFound   "))
            })
            this.scrollToBottom()
        } else {
            alert("No emty messages")
        }
    }


    handleChange(event:React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            content: event.target.value
        })
    }

    handleKeyPress(e:React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) this.sendMessage()
    }

    async Block(id:string) {
        if (this.state.self?.blocked.includes(id)) {
            throw new Error("alredy blocked")
        }
        await this.state.API?.block(id)
        let curUser = this.state.self
        curUser?.blocked.push(id)
        this.setState({
            self:curUser
        })
    }


    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    async updateChannel(id:string, opendm:boolean = false) {
        if (opendm) {
            id = (await this.state.API.OpenDM(id))._id_
        }
        if (id === this.state.channId) {
            return
        }
        let messages = this.state.messages
        if (!messages[id]) {
            messages[id] = await this.state.API.getMessages(id)
        }
        this.setState({
            chan: await this.state.API.getChannel(id),
            channId:id,
            messages: messages,
            previewMsg: ""
        })
        this.messagesMaker()
        this.scrollToBottom()
    }


    render() {

        // let friendsArrayFin:any[] = []
        let friendsArrayFin:any[] = (this.state.self ?? {friends: []}).friends.map((friend:PreviewUser) => {
            return (
                <div key={friend._id_} onClick={() => {this.updateChannel( friend._id_, true )}}>
                    <QuickProfile id={friend._id_} pfp={friend.pfp} username={friend.username}></QuickProfile>
                </div>
            )
        })

        return (
            <div className="container">
                <div className="row">
                    <SideBarLeft pfp={this.state.self?.pfp as string} status={this.state.self?.status ? this.state.self?.status : "student"}></SideBarLeft>
                    <div className="col-2-f">
                            <div className="Box">
                                <QuickProfile id={this.state.self?._id_ ?? ""} pfp={this.state.self?.pfp ?? ""} username={this.state.self?.username ?? ""} ></QuickProfile>
                            </div>
                            <div className="FriendsTab">
                                {friendsArrayFin[0] ? friendsArrayFin : <h1 className="vertCenter">Oh no!<br />You have no friends!</h1>}
                            </div>
                        <form className="UserSwitcher" onSubmit={this.ChangeUser} action="#">
                            <input type="textArea" placeholder="userId" value={this.state.userIdContent} onChange={this.handleChangeOfUser}></input>
                        </form>
                    </div>

                    <div className="col">
                <div className="Box row">
                    <div className="col-05">
                        <h1 className="NoMargin TopicBar"> {this.state.chan?.name==="DM" ? "@ " : "#"} </h1>
                    </div>
                    <div className="col">
                        <h1 className="NoMargin TopicBar">{ this.state.chan?.name==="DM" ? this.state.chan.otherMembers[0].username : this.state.chan?.name  }</h1>
                    </div>
                </div>
                <div className="chat col-auto">

                    <div className="Messages row">
                        <ul>
                            { this.state.msgElmnt }
                        </ul>
                        {this.state.previewMsg}
                        <div ref={this.messagesEndRef} />
                    </div>

                    <Menu id="ContextMenuUser" theme="dark" animation="slide">
                        <div className="Local">
                            <Item>Profile</Item>
                            <Item>Toggle Friendship</Item>
                            <Item>Report</Item>
                            <Item onClick={() => {this.Block(this.state.chan?.otherMembers[0]._id_ ?? "")}}>Block</Item>
                            <Item>Note</Item>
                        </div>
                    </Menu>

                    <div className="row">
                        <textarea style={{resize:"none"}} className="MessageBar" value={this.state.content} onChange={this.handleChange} onKeyPress={this.handleKeyPress} ></textarea>
                    </div>
                </div>

            </div>
                </div>
            </div>
        )
    }
}
