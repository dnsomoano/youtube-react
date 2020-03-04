import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from "./Images/YouTube_Logo_2017.svg";
import HomePage from "./Components/Homepage";
import Video from "./Components/Video";
import Watch from "./Components/Watch";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          {/* <div> */}
            <img className="App-logo" src={logo} alt="logo" />
          {/* </div> */}
          <div>
            <input name="searchTerm" type="Search" placeholder="Search" />
            <button>Submit</button>
          </div>
        </div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/:channelTitle/:title/v=:videoId"
            exact
            component={Watch}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
