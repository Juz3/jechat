import React, { Fragment } from "react";
import socketClient from "socket.io-client";

const socket = socketClient("http://localhost:4999");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      msg: ""
    };
  }

  componentDidMount() {
    socket.on("send message", message => {
      this.setState({
        conversation: message
      });
    });
  }

  sendMessage = () => {
    const newMsg = this.state.msg;
    const conv = this.state.conversation;

    conv.push(newMsg);
    console.log(conv);

    this.setState({
      conversation: conv
    });
    socket.emit("send message", this.state.conversation);
    console.log("send message");
  };

  getTimeStamp = () => {
    const time = new Date();
    const formattedTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    console.log(formattedTime.toString());
    return formattedTime.toString();
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
            this.state.msg.length > 0 ? this.sendMessage() : console.log("msg empty");
          }}
        >
          <input className="textInput" onChange={e => this.setState({ msg: e.target.value })} />
          <button className="btn">Send</button>
        </form>
      </Fragment>
    );
  }
}

export default Chat;
