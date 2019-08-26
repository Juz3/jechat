import React, { Fragment, useState } from "react";

const RegisterForm = props => {
  const [formData, setFormData] = useState({ username: "", password: "", password2: "" });

  const { username, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitRegister = async e => {
    e.preventDefault();

    if (password !== password2) {
      // proper alert here
      alert("passwords do not match");
    } else {
      props.register(username, password);
    }
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
          required
          onChange={e => onChange(e)}
        />
        <label htmlFor="username">Password</label>
        <input
          className="registerInput"
          id="registerPw"
          type="password"
          placeholder=""
          name="password"
          required
          onChange={e => onChange(e)}
        />
        <label htmlFor="username">Confirm password</label>
        <input
          className="registerInput"
          id="registerPw2"
          type="password"
          placeholder=""
          name="password2"
          required
          onChange={e => onChange(e)}
        />
        <button className="btn">Register</button>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
