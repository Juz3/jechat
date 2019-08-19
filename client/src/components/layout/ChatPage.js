import React, { Fragment, useState } from "react";
import Chat from "../chat/Chat";
import UserForm from "./UserForm";

const ChatPage = () => {
  const [username, setUsername] = useState("");

  return (
    <Fragment>
      <UserForm setName={setUsername} />
      <Chat username={username} />
    </Fragment>
  );
};

export default ChatPage;
