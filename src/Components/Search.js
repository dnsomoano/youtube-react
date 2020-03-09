import React, { Component } from "react";
import "../App.css";
import searchIcon from "../Images/Vector_search_icon.svg";
import { Link } from "react-router-dom";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.searchTerm);
  };

  render() {
    return (
      <div className="search">
        <input
          className="search-input"
          name="searchTerm"
          type="Search"
          onChange={this.handleInputChange}
          placeholder="Search"
          value={this.state.searchTerm}
          autoFocus
        />
        <Link to={`/search/${this.state.searchTerm}`}>
          <button className="search-icon-button">
            <img className="search-icon" src={searchIcon} alt="search-icon" />
          </button>
        </Link>
      </div>
    );
  }
}

export default Search;
