import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const mainLinks = (
    <ul>
      <li>
        <Link to="/">/</Link>
      </li>
      <li>
        <Link to="/sketch">sketch</Link>
      </li>
    </ul>
  );

  return <Fragment>{mainLinks}</Fragment>;
};

export default Navbar;
