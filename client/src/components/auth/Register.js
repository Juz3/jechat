import React, { Fragment, useState } from "react";
import RegisterForm from "./RegisterForm";
import axios from "axios";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const registerUser = async (username, password) => {
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };

    const payload = JSON.stringify({ username, password });

    try {
      const res = await axios.post("/api/users", payload, config);

      if (res.status === 200) {
        setIsRegistered(true);
        // Set auth cookie here with res.data."cookie"
        console.log(`user ${username} registered successfully`);
      }
    } catch (error) {
      const errors = error.response.data.errors;
      console.error(errors);
    }
  };

  const form = <RegisterForm register={registerUser} />;

  const success = (
    <div>
      <h2 className="h1-main">Registered successfully!</h2>
    </div>
  );

  const pageContent = isRegistered ? success : form;

  return <Fragment>{pageContent}</Fragment>;
};

export default Register;
