import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/layout/ChatPage";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/layout/NotFound";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ChatPage} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
