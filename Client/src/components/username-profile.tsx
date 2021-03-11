import {Component} from "react"
import { status } from "../API/APItypes"


export class QuickProfile extends Component<{pfp:string, username:string, status?:status, id:string}> {
    render() {
      return (
      <div className="QuickProfile row" id={this.props.id}>
        <div className="col-3">
          <img src={this.props.pfp} className="pfp-f" alt={this.props.username}></img>
        </div>
          <div className="col content NoMargin">
            <h3 className="username NoMargin"> {this.props.username}</h3>
            <p className="username NoMargin"> { this.props.status ? this.props.status : "" } </p>
          </div>
      </div>
      )
    }
}