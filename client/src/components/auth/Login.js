import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import axios from "axios";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        // Set auth cookie here with res.data."cookie"
        //console.log(res);
        console.log(`user ${username} logged in successfully`);
      }
    } catch (error) {
      const errors = error.response.data.errors;
      console.error(errors);
    }
  };

  const form = <LoginForm login={loginUser} />;

  const success = (
    <div>
      <h2 className="h1-main">Logged in successfully!</h2>
    </div>
  );

  const pageContent = isLoggedIn ? success : form;

  return <Fragment>{pageContent}</Fragment>;
};

export default Login;
