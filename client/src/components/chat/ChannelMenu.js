import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const ChannelMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = e => {
    console.log("open");
    setIsOpen(!isOpen);
  };

  const menuButton = (
    <button className="btn" onClick={e => handleClick(e)}>
      {isOpen ? "Close Menu" : "Open Menu"}
    </button>
  );

  /*   const grayLinkStyle = {
    color: "#aaa"
  }; */

  const channelMenu = (
    <Fragment>
      <div className="channelMenuContainer">
        <h2 className="h2-main">Join Channel</h2>
        <ul className="chList">
          <Link className="chLinks" to="/">
            <li>Lobby</li>
          </Link>

          <Link className="chLinks" to="/channel-1">
            <li>channel 1</li>
          </Link>

          {/* <li>
            <Link className="chLinks" to="/channel-2">
              channel 2
            </Link>
          </li>
          <li>
            <Link className="chLinks" to="/channel-3">
              channel 3
            </Link>
          </li>
          <li>
            <Link className="chLinks" to="/channel-4">
              channel 4
            </Link>
          </li> */}
        </ul>
      </div>
      {menuButton}
    </Fragment>
  );

  const content = isOpen ? channelMenu : menuButton;

  return <Fragment>{content}</Fragment>;
};

export default ChannelMenu;
