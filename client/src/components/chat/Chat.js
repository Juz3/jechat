import React, { Fragment } from "react";
import socketClient from "socket.io-client";

const socket = socketClient("http://localhost:4999");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      newMessage: "",
      timestamp: []
    };
  }

  componentDidMount() {
    socket.on("send message", payload => {
      console.log(payload);
      this.setState({
        conversation: payload.msg,
        timestamp: payload.timestamp
      });
    });
  }

  sendMessage = () => {
    const newMsg = this.state.newMessage;
    const msg = this.state.conversation;

    msg.push(newMsg);
    console.log(msg);

    this.setState({
      conversation: msg
    });
    socket.emit("send message", this.state.conversation);
    console.log("send message");
  };

  // Get time from server instead of this
  getTimeStamp = () => {
    const time = this.state.timestamp;
    return time;
  };

  render() {
    return (
      <Fragment>
        <ul className="messages">
          {this.state.conversation.map((msg, index) => (
            <li key={index}>
              <div className="username">username</div>
              <div className="timestamp">{this.getTimeStamp()}</div>
              <div className="msg">{msg}</div>
            </li>
          ))}
        </ul>

        <form
          className="messageForm"
          onSubmit={e => {
            e.preventDefault();
            this.state.newMessage.length > 0 ? this.sendMessage() : console.log("msg empty");
          }}
        >
          <input
            className="textInput"
            onBlur={e => {
              this.setState({ newMessage: e.target.value });
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
