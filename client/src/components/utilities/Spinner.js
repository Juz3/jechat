import React, { Fragment } from "react";
import spinner from "./spinner.svg";

export default () => (
  <Fragment>
    <img
      id="spinner"
      src={spinner}
      style={{ width: "150px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
