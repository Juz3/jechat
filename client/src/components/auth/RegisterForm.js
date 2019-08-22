import React, { Fragment, useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");

  const submitRegister = e => {
    e.preventDefault();
    console.log("submit register form", username);
  };

  return (
    <Fragment>
      <form
        className="registerForm"
        onSubmit={e => {
          submitRegister(e);
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          className="registerInput"
          id="registerUsername"
          placeholder=""
          name="username"
          onChange={e => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="username">Password</label>
        <input
          className="registerInput"
          id="registerPw"
          type="password"
          placeholder=""
          name="password"
          required
        />
        <label htmlFor="username">Confirm password</label>
        <input
          className="registerInput"
          id="registerPw2"
          type="password"
          placeholder=""
          name="password2"
          required
        />
        <button className="btn">Register</button>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
