import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth");
      console.log("res:", res);

      if (res.data) {
        setUsername(res.data.username);
      } else {
        console.log("username not set yet", res.data);
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => console.error(error.msg, "danger"));
      }
    }
  };

  const user = username ? username : " ";

  const userInfo = (
    <p className="p-1">
      Logged in as <strong>{user}</strong>
    </p>
  );

  return <div>{userInfo}</div>;
};

export default UserProfile;
