import React from "react";
import "./App.css";
import Chat from "./components/chat/Chat";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Chat />
      </div>
    );
  }
}

export default App;
