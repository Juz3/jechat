import React, { Fragment, useEffect, useState } from "react";
import Chat from "./Chat";
//import UserProfile from "./UserProfile";
import UserForm from "../layout/UserForm";
import ChannelMenu from "./ChannelMenu";
import getColor from "../layout/getColor";

const ChatPage = props => {
  const [user, setUser] = useState({ username: null, color: null });

  // IMPLEMENT AUTH CHECK SOMEWHERE
  //const auth = props.isAuth;

  useEffect(() => {
    if (localStorage.getItem("jechat-nickname")) {
      setUser({ username: localStorage.getItem("jechat-nickname"), color: getColor() });
    }
  }, []);

  const nicknameUserForm = <UserForm setUserObject={setUser} />;
  //const loggedUserForm = <UserProfile loggedUser={props.user} />;

  // IMPLEMENT AUTH CHECK HERE
  //let form = auth ? loggedUserForm : nicknameUserForm;
  let form = nicknameUserForm;

  return (
    <Fragment>
      {form}
      <Chat user={user} />
      <ChannelMenu />
    </Fragment>
  );
};

export default ChatPage;
