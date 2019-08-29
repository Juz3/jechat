import React from "react";

const UserProfile = props => {
  const username = props.loggedUser.username;

  const userInfo = (
    <p className="p-1">
      Logged in as <strong>{username}</strong>
    </p>
  );

  const userInfoText = username ? userInfo : " ";

  return <div>{userInfoText}</div>;
};

export default UserProfile;
