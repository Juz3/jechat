import React, { Fragment, useState } from "react";
import colorArray from "../layout/colors";

const UserForm = props => {
  const [username, setUsername] = useState("");
  const [submit, setSubmit] = useState(false);

  const getColor = () => {
    const MIN = 0;
    const MAX = colorArray.length;

    const colorNumber = Math.floor(Math.random() * (MAX - MIN));
    const color = colorArray[colorNumber];
    return color;
  };

  return (
    <Fragment>
      {username.length > 1 && username.length < 25 && submit ? (
        <p className="p-1">
          Nickname: <strong>{username}</strong>
        </p>
      ) : (
        <form
          className="usernameForm"
          onSubmit={e => {
            e.preventDefault();
            setSubmit(true);
            props.setUserObject({ username: username, color: getColor() });
          }}
        >
          <p className="p-1">Nickname: {username}</p>
          <input
            className="usernameInput"
            minLength="1"
            maxLength="24"
            placeholder="nickname"
            onChange={e => setUsername(e.target.value)}
          />
          <button className="btn">Ok</button>
        </form>
      )}
    </Fragment>
  );
};

export default UserForm;
