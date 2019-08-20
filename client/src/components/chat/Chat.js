import React, { Fragment } from "react";
import socketClient from "socket.io-client";
import colorArray from "../layout/colors";
/* import Spinner from "../utilities/Spinner"; */

const socket = socketClient("/");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      newMsg: "",
      newMessage: {},
      timestamp: [],
      loaded: false
    };
  }

  componentDidMount() {
    socket.on("send message", payload => {
      console.log(payload);
      this.setState({
        conversation: payload,
        loaded: true
      });

      document.title = "* Jechat";
    });
  }

  sendMessage = () => {
    this.mainInput.value = "";

    const newMessage = {
      user: this.props.user,
      msg: this.state.newMsg,
      timestamp: this.getTimeStamp()
    };

    const convo = this.state.conversation;

    convo.push(newMessage);
    this.setState({
      newMsg: ""
    });

    this.setState({
      conversation: convo
    });

    socket.emit("send message", this.state.conversation);
  };

  validateMessage(e) {
    e.target.value.length < 401
      ? this.setState({
          newMsg: e.target.value
        })
      : console.log("message too long");
  }

  getTimeStamp = () => {
    const time = new Date();
    const hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if (seconds < 10) seconds = ("0" + seconds).toString();
    if (minutes < 10) minutes = ("0" + minutes).toString();

    const formattedTime = hours + ":" + minutes + ":" + seconds;

    return formattedTime.toString();
  };

  render() {
    const conversation = this.state.loaded ? (
      this.state.conversation.map((entry, index) => (
        <li key={index}>
          <div className="username" style={{ color: entry.user.color }}>
            {entry.user.username}
          </div>
          <div className="timestamp">{entry.timestamp}</div>
          <div className="msg">{entry.msg}</div>
        </li>
      ))
    ) : (
      <Fragment>
        <li>
          <div className="username" style={{ color: "rgb(70, 93, 170)" }}>
            Jechat
          </div>
          <div className="timestamp">{this.getTimeStamp()}</div>
          <div className="msg" style={{ color: "#ddd" }}>
            Message of the day
          </div>
        </li>
        {/* <Spinner /> */}
      </Fragment>
    );

    const form =
      //this.props.user.username.length > 2 ? (
      5 > 2 ? (
        <form
          className="messageForm"
          onSubmit={e => {
            e.preventDefault();
            console.log(this.props.user);
            this.state.newMsg.length > 0 ? this.sendMessage() : console.log("msg empty");
          }}
        >
          <input
            className="textInput"
            ref={ref => (this.mainInput = ref)}
            minLength="1"
            maxLength="400"
            placeholder="Write a message..."
            onChange={e => {
              this.validateMessage(e);
            }}
            onClick={() => (document.title = "Jechat")}
          />
          {/*{"\uD83D\uDE0E"}*/}
          <button className="btn">Send</button>
        </form>
      ) : (
        <div> </div>
      );

    return (
      <Fragment>
        <ul className="messages">{conversation}</ul>

        {form}
      </Fragment>
    );
  }
}

export default Chat;
