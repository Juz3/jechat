import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../utilities/Spinner";

const Logout = props => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const action = () => {
      setRedirect(true);
      props.logout();
    };
    setTimeout(action, 1000);
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
