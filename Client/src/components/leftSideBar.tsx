import { Component } from "react"
import { status } from "../API/APItypes"

export class SideBarLeft extends Component<{pfp:string, status:status}> {
    render() {
        return (
            <div className="leftSideBar col-05-f fullCol">
                <img className="home" src={this.props.pfp} alt="home"></img>
            </div>
      )
    }
}