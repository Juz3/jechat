import React, { Fragment, useEffect, useState } from "react";
import Chat from "./Chat";
import Chat2 from "./Chat2";
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
      setUser({
        username: localStorage.getItem("jechat-nickname"),
        color: getColor()
      });
    }
  }, []);

  const nicknameUserForm = <UserForm setUserObject={setUser} />;
  //const loggedUserForm = <UserProfile loggedUser={props.user} />;

  // IMPLEMENT AUTH CHECK HERE
  //let form = auth ? loggedUserForm : nicknameUserForm;
  let form = nicknameUserForm;

  const lobby = "lobby";
  const channel_1 = "channel-1";

  return (
    <Fragment>
      {form}
      <Chat user={user} channelName={lobby} />
      <ChannelMenu />
      {/* <Chat user={user} channelName={channel_1} /> */}
      <Chat2 user={user} channelName={channel_1} />
    </Fragment>
  );
};

export default ChatPage;
