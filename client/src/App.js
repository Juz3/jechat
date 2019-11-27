import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import ChatPage from "./components/chat/ChatPage";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import CanvasDemo from "./components/sketch/CanvasDemo";
import LiveSketch from "./components/sketch/LiveSketch";
import NotFound from "./components/layout/NotFound";
import setAuthToken from "./utilities/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    verifyUser();
  }, []);

  /*   useEffect(() => {
    console.log("2", user);
    if (user !== null) console.log(user._id.length);
  }, [user]); */

  const verifyUser = async () => {
    if (localStorage.token) {
      try {
        const res = await axios.get("/api/auth");

        setUser(res.data);
        setIsAuth(true);
        //console.log("1", res.data);
      } catch (error) {
        //console.error(error.response);

        if (error.response.status === 401) {
          console.log(error.response.status, "Unauthorized login attempt");
        }
      }
    }
  };

  return (
    <div className="container">
      <Router>
        <Fragment>
          <Navbar auth={isAuth} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <ChatPage {...props} isAuth={isAuth} user={user} />
              )}
            />
            <Route
              exact
              path="/channel-1"
              render={props => (
                <ChatPage
                  {...props}
                  isAuth={isAuth}
                  user={user}
                  channel={"channel-1"}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} setAuth={setIsAuth} />}
            />
            <Route
              exact
              path="/logout"
              render={props => (
                <Logout {...props} setAuth={setIsAuth} setUser={setUser} />
              )}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/canvasdemo" component={CanvasDemo} />
            <Route exact path="/livesketch" component={LiveSketch} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
