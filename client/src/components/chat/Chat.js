import React, { Fragment } from "react";
import socketClient from "socket.io-client";

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
      //console.log(payload);
      this.setState({
        conversation: payload,
        loaded: true
      });
    });
  }

  sendMessage = () => {
    // clear input
    this.mainInput.value = "";

    const newMessage = {
      user: "User",
      msg: this.state.newMsg,
      timestamp: this.getTimeStamp()
    };

    const convo = this.state.conversation;

    convo.push(newMessage);
    this.setState({
      newMsg: ""
    });
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

    return formattedTime.toString();
  };

  clearInput() {
    console.log("clear");
  }

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

    return (
      <Fragment>
        <ul className="messages">{conversation}</ul>

        <form
          className="messageForm"
          onSubmit={e => {
            e.preventDefault();
            this.state.newMsg.length > 0 ? this.sendMessage() : console.log("msg empty");
          }}
        >
          <input
            className="textInput"
            ref={ref => (this.mainInput = ref)}
            onChange={e => {
              this.setState({
                newMsg: e.target.value
              });
              /* e.target.value = ""; */
            }}
          />
          <button className="btn">Send</button>
        </form>
      </Fragment>
    );
  }
}

export default Chat;
