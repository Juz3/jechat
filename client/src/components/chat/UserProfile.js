import React from "react";

const UserProfile = () => {
  const username = "placeholder username view";

  const userInfoText = (
    <p className="p-1">
      Logged in as <strong>{username}</strong>
    </p>
  );

  return <div>{userInfoText}</div>;
};

export default UserProfile;
