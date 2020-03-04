import React from "react";
import "./App.css";
import logo from "./Images/YouTube_Logo_2017.svg";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePage from "./Components/Homepage";
import Search from "./Components/Search";
import Video from "./Components/Video";
import Watch from "./Components/Watch";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <img className="App-logo" src={logo} alt="logo" />
          <Search />
        </div>
        <div className="page-manager">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/:channelTitle/:title/v=:videoId"
              exact
              component={Watch}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
