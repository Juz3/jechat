import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const publicLinks = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sketch">Sketch</Link>
      </li>
      <li id="middleLink">
        <Link to="/login">Login</Link>
      </li>
      <li id="middleLink">
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sketch">Sketch</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </ul>
  );

  const mainLinks = props.auth ? authLinks : publicLinks;

  return (
    <Fragment>
      <nav className="navbar">{mainLinks}</nav>
    </Fragment>
  );
};

export default Navbar;
