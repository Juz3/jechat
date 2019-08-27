import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../utilities/Spinner";

const Logout = props => {
  useEffect(() => {
    timedAction();
  }, []);

  const [redirect, setRedirect] = useState(false);

  const timedAction = () => {
    setTimeout(() => actions(), 3000);
  };

  const actions = () => {
    props.logout();
    setRedirect(true);
  };

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
