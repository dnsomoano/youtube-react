import React from "react";
import "./App.css";
import logo from "./Images/YouTube_Logo_2017.svg";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePage from "./Components/Homepage";
import Search from "./Components/Search";
import Video from "./Components/Video";
import Watch from "./Components/Watch";
import Results from "./Components/Results";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to={`/`}>
          <div className="container">
            <img className="App-logo" src={logo} alt="logo" />
            <Search />
          </div>
        </Link>
        <div className="page-manager page-background">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/search/:searchTerm"
              exact
              // render={props => (
              //   <SearchResults
              //     {...props}
              //     searchTerm={this.state.searchTerm}
              //   />
              // )}
              component={Results}
            />
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
