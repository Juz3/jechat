import React, { Fragment, useEffect, useState } from "react";
import Chat from "./Chat";
import Chat2 from "./Chat2";
//import UserProfile from "./UserProfile";
import UserForm from "../layout/UserForm";
import ChannelMenu from "./ChannelMenu";
import getColor from "../layout/getColor";

const ChatPage = props => {
  const [user, setUser] = useState({ username: null, color: null });

  const [channel, setChannel] = useState(null);

  // IMPLEMENT AUTH CHECK SOMEWHERE
  //const auth = props.isAuth;

  useEffect(() => {
    if (localStorage.getItem("jechat-nickname")) {
      setUser({
        username: localStorage.getItem("jechat-nickname"),
        color: getColor()
      });
    }

    if (props.channel === "channel-1") {
      setChannel(props.channel);
    } else {
      setChannel(null);
    }
  }, [props.channel]);

  const nicknameUserForm = <UserForm setUserObject={setUser} />;
  //const loggedUserForm = <UserProfile loggedUser={props.user} />;

  // IMPLEMENT AUTH CHECK HERE
  //let form = auth ? loggedUserForm : nicknameUserForm;
  let form = nicknameUserForm;

  const lobby = "lobby";
  const channel_1 = "channel-1";

  const chat_lobby = <Chat user={user} channelName={lobby} />;
  const chat_channel_1 = <Chat2 user={user} channelName={channel_1} />;

  const renderedChat = channel === null ? chat_lobby : chat_channel_1;

  return (
    <Fragment>
      {form}
      {renderedChat}
      <ChannelMenu />
    </Fragment>
  );
};

export default ChatPage;
