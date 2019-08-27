import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/chat/ChatPage";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import Sketch from "./components/sketch/Sketch";
import NotFound from "./components/layout/NotFound";
import setAuthToken from "./utilities/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <div className="container">
      <Router>
        <Fragment>
          <Navbar auth={isAuth} logout={logout} />
          <Switch>
            <Route exact path="/" component={ChatPage} />
            <Route exact path="/login" render={props => <Login {...props} setAuth={setIsAuth} />} />
            <Route exact path="/logout" render={props => <Logout {...props} logout={logout} />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/sketch" component={Sketch} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
