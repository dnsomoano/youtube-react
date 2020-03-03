import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePage from "./Components/Homepage";
import Video from "./Components/Video";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/v=:videoId" exact component={Video} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
