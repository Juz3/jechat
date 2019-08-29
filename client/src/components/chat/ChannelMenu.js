import React, { Fragment, useState } from "react";

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

  const channelMenu = (
    <Fragment>
      <div className="channelMenuContainer">
        <h2 className="h2-main">Join Channel</h2>
        <ul className="chList">
          <li>Lobby</li>
          <li>channel 1</li>
          <li>channel 2</li>
          <li>channel 2</li>
          <li>channel 4</li>
        </ul>
      </div>
      {menuButton}
    </Fragment>
  );

  const content = isOpen ? channelMenu : menuButton;

  return <Fragment>{content}</Fragment>;
};

export default ChannelMenu;
