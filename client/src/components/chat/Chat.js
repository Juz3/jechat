import React, { Fragment } from "react";
import socketClient from "socket.io-client";

const socket = socketClient("http://localhost:4999");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
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
    });
  }

  /*   sendMessage = () => {
    const newMsg = this.state.newMessage;
    const msg = this.state.conversation;

    msg.push(newMsg);
    console.log(msg);

    this.setState({
      conversation: msg
    });
    socket.emit("send message", this.state.conversation);
    console.log("send message");
  }; */

  sendMessage = () => {
    const newMessage = this.state.newMessage;
    const convo = this.state.conversation;

    convo.push(newMessage);
    console.log(convo);

    this.setState({
      conversation: convo
    });
    socket.emit("send message", this.state.conversation);
    console.log("send message");
  };

  getTimeStamp = () => {
    const time = new Date();
    const hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if (seconds < 10) seconds = ("0" + seconds).toString();
    if (minutes < 10) minutes = ("0" + minutes).toString();

    const formattedTime = hours + ":" + minutes + ":" + seconds;
    console.log(formattedTime.toString());
    return formattedTime.toString();
  };

  render() {
    const conversation = this.state.loaded
      ? this.state.conversation.map((entry, index) => (
          <li key={index}>
            <div className="username">{entry.user}</div>
            <div className="timestamp">{entry.timestamp}</div>
            <div className="msg">{entry.msg}</div>
          </li>
        ))
      : null;

    console.log(this.state.conversation);

    return (
      <Fragment>
        <ul className="messages">{conversation}</ul>

        <form
          className="messageForm"
          onSubmit={e => {
            e.preventDefault();
            this.state.newMessage.msg.length > 0 ? this.sendMessage() : console.log("msg empty");
          }}
        >
          <input
            className="textInput"
            onBlur={e => {
              this.setState({
                newMessage: { user: "newUser", msg: e.target.value, timestamp: this.getTimeStamp() }
              });
              e.target.value = "";
            }}
          />
          <button className="btn">Send</button>
        </form>
      </Fragment>
    );
  }
}

export default Chat;
