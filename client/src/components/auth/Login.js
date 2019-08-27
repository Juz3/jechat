import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import Spinner from "../utilities/Spinner";
import axios from "axios";

const Login = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const loginUser = async (username, password) => {
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };

    const payload = JSON.stringify({ username, password });

    try {
      const res = await axios.post("/api/auth", payload, config);

      if (res.status === 200) {
        setIsLoggedIn(true);
        props.setAuth(true);
        localStorage.setItem("token", res.data.token);
        console.log(`user ${username} logged in successfully`);

        setTimeout(() => setRedirect(true), 1000);
      }
    } catch (error) {
      const errors = error.response.data.errors;
      console.error(errors);
    }
  };

  const form = <LoginForm login={loginUser} />;

  const success = (
    <div>
      <h2 className="h1-main">Logged in successfully! Redirecting...</h2>
      <Spinner />
    </div>
  );

  const pageContent = isLoggedIn ? success : form;

  if (redirect) {
    return <Redirect to="/" />;
  }

  return <Fragment>{pageContent}</Fragment>;
};

export default Login;
