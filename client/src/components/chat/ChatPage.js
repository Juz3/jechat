import React, { Fragment, useEffect, useState } from "react";
import Chat from "./Chat";
import UserProfile from "./UserProfile";
import UserForm from "../layout/UserForm";
import getColor from "../layout/getColor";

// IMPLEMENT AUTH CHECK SOMEWHERE
const auth = false;

const ChatPage = () => {
  const [user, setUser] = useState({ username: null, color: null });

  useEffect(() => {
    if (localStorage.getItem("jechat-nickname")) {
      setUser({ username: localStorage.getItem("jechat-nickname"), color: getColor() });
    }
  }, []);

  const nicknameUserForm = <UserForm setUserObject={setUser} />;
  const loggedUserForm = <UserProfile />;

  // IMPLEMENT AUTH CHECK HERE
  let form = auth ? loggedUserForm : nicknameUserForm;

  return (
    <Fragment>
      {form}
      <Chat user={user} />
    </Fragment>
  );
};

export default ChatPage;
