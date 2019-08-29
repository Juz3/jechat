import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../utilities/Spinner";

const Logout = props => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setRedirect(true);
    props.setAuth(false);
    props.setUser(null);
    localStorage.removeItem("token");
  }, [props]);

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h2 className="h1-main">
          Logged out! Redirecting...
          <Spinner />
        </h2>
      </div>
    );
  }
};

export default Logout;
