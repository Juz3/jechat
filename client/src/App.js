import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/chat/ChatPage";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Sketch from "./components/sketch/Sketch";
import NotFound from "./components/layout/NotFound";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ChatPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sketch" component={Sketch} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
