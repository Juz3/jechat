import React, { Fragment, useState } from "react";

const UserForm = props => {
  const [username, setUsername] = useState("");
  const [submit, setSubmit] = useState(false);

  return (
    <Fragment>
      {username.length > 2 && submit ? (
        <p className="p-1">
          Nickname: <strong>{username}</strong>
        </p>
      ) : (
        <form
          className="usernameForm"
          onSubmit={e => {
            e.preventDefault();
            setSubmit(true);
            props.setName(username);
          }}
        >
          <p className="p-1">Nickname: {username}</p>
          <input
            className="usernameInput"
            onChange={e => setUsername(e.target.value)}
          />
          <button className="btn">Ok</button>
        </form>
      )}
    </Fragment>
  );
};

export default UserForm;
