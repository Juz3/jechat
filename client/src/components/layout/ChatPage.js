import React, { Fragment, useState } from "react";
import Chat from "../chat/Chat";
import Landing from "../landing/Landing";

const ChatPage = () => {
  const [username, setUsername] = useState("");

  return (
    <Fragment>
      <Landing setName={setUsername} />
      <Chat username={username} />
    </Fragment>
  );
};

export default ChatPage;
