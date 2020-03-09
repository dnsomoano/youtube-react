import React from "react";
import "./App.css";
import logo from "./Images/YouTube_Logo_2017.svg";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePage from "./Components/Homepage";
import Search from "./Components/Search";
// import Video from "./Components/Video";
import Watch from "./Components/Watch";
import Results from "./Components/Results";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Link to={`/`}>
            <img className="App-logo logo-container" src={logo} alt="logo" />
            <header className="header-font">Dogs</header>
          </Link>
          <Search />
        </div>
        <div className="page-manager page-background">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search/:searchTerm" exact component={Results} />
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
