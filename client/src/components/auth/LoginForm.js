import React, { Fragment, useState } from "react";

const LoginForm = props => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitLogin = async e => {
    e.preventDefault();

    props.login(username, password);
  };

  return (
    <Fragment>
      <form
        className="loginForm"
        onSubmit={e => {
          submitLogin(e);
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          className="loginInput"
          id="loginUsername"
          placeholder=""
          name="username"
          onChange={e => onChange(e)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="loginInput"
          id="loginPw"
          type="password"
          placeholder=""
          name="password"
          required
          onChange={e => onChange(e)}
        />
        <button className="btn">Login</button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
