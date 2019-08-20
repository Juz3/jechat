import React, { Fragment, useState } from "react";
import Chat from "../chat/Chat";
import UserForm from "./UserForm";

const ChatPage = () => {
  const [user, setUser] = useState({ username: null, color: null });

  return (
    <Fragment>
      <UserForm setUserObject={setUser} />
      <Chat user={user} />
    </Fragment>
  );
};

export default ChatPage;
