import React, { Fragment, useEffect, useState } from "react";
import Chat from "../chat/Chat";
import UserForm from "./UserForm";
import getColor from "./getColor";

const ChatPage = () => {
  const [user, setUser] = useState({ username: null, color: null });

  useEffect(() => {
    if (localStorage.getItem("jechat-nickname")) {
      setUser({ username: localStorage.getItem("jechat-nickname"), color: getColor() });
    }
  }, []);

  return (
    <Fragment>
      <UserForm setUserObject={setUser} />
      <Chat user={user} />
    </Fragment>
  );
};

export default ChatPage;
