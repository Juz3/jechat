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

  const grayLinkStyle = {
    color: "#aaa"
  };

  const channelMenu = (
    <Fragment>
      <div className="channelMenuContainer">
        <h2 className="h2-main">Join Channel</h2>
        <ul className="chList">
          <li>
            <Link className="chLinks" to="/">
              Lobby
            </Link>
          </li>
          <li>
            <Link className="chLinks" to="/channel-1">
              channel 1
            </Link>
          </li>
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
          <li style={grayLinkStyle}>channel 2</li>
          <li style={grayLinkStyle}>channel 3</li>
          <li style={grayLinkStyle}>channel 4</li>
        </ul>
      </div>
      {menuButton}
    </Fragment>
  );

  const content = isOpen ? channelMenu : menuButton;

  return <Fragment>{content}</Fragment>;
};

export default ChannelMenu;
