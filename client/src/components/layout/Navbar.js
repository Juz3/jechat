import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const mainLinks = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li id="middleLink">
        <Link to="/login">Login</Link>
      </li>
      <li id="middleLink">
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/sketch">Sketch</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className="navbar">{mainLinks}</nav>
    </Fragment>
  );
};

export default Navbar;
