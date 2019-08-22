import React, { Fragment, useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");

  const submitLogin = e => {
    e.preventDefault();
    console.log("submit login form", username);
  };

  return (
    <Fragment>
      <form
        className="loginForm"
        onSubmit={e => {
          submitLogin(e);
        }}
      >
        <input
          className="loginInput"
          id="loginUsername"
          placeholder="username"
          onChange={e => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          className="loginInput"
          id="loginPw"
          type="password"
          placeholder="password"
          required
        />
        <button className="btn">Login</button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
