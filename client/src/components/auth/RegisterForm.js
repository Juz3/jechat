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
        <input
          className="registerInput"
          id="registerUsername"
          placeholder="username"
          onChange={e => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          className="registerInput"
          id="registerPw"
          type="password"
          placeholder="password"
          required
        />

        <input
          className="registerInput"
          id="registerPw2"
          type="password"
          placeholder="retype password"
          required
        />
        <button className="btn">Register</button>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
