import React, { Fragment, useState } from "react";
import getColor from "./getColor";

const UserForm = props => {
  const [username, setUsername] = useState(
    localStorage.getItem("jechat-nickname") && localStorage.getItem("jechat-nickname").length < 25
      ? localStorage.getItem("jechat-nickname")
      : ""
  );
  const [submit, setSubmit] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    localStorage.setItem("jechat-nickname", username);
    const userColor = getColor();
    props.setUserObject({ username: username, color: userColor });
  };

  const clearStorage = () => {
    localStorage.clear();
    setUsername("");
    setSubmit(false);
  };

  return (
    <Fragment>
      {(username.length > 1 && username.length < 25 && submit) ||
      (localStorage.getItem("jechat-nickname") &&
        localStorage.getItem("jechat-nickname").length < 25) ? (
        <Fragment>
          <p className="p-1">
            Nickname: <strong>{username}</strong>
          </p>
          {localStorage.getItem("jechat-nickname") ? (
            <button className="btn-small" onClick={() => clearStorage()}>
              reset
            </button>
          ) : null}
        </Fragment>
      ) : (
        <form className="usernameForm" onSubmit={e => onSubmit(e)}>
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
