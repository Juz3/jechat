import React, { useState } from "react";

const Landing = props => {
  const [username, setUsername] = useState("");

  return (
    <div>
      <form
        className="usernameForm"
        onSubmit={e => {
          e.preventDefault();
          console.log("submit", username);
          props.setName(username);
        }}
      >
        <p>username: {username}</p>
        <input className="usernameInput" onChange={e => setUsername(e.target.value)} />
      </form>
    </div>
  );
};

export default Landing;
