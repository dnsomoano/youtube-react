import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    const url = "https://www.googleapis.com/youtube/v3/search?key=";
    const key = "HIDDEN";
    const parameters = "&part=snippet&type=video&q=";
    let query = "dogs";
    const apiUrl = url + key + parameters + query;
    console.log(apiUrl);
    fetch(apiUrl)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ videos: data.items });
        console.log(data);
        console.log(data.items);
      });
  }

  render() {
    return (
      <div>
        {this.state.videos.map((video, idx) => {
          return (
            <div key={idx} className="box">
              <div>{video.snippet.title}</div>
              <div>
                <Link to={`/v=${video.id.videoId}`}>
                  <img
                    src={`${video.snippet.thumbnails.high.url}`}
                    alt={video.id.videoId}
                  />
                </Link>
              </div>
              {/* <div>{video.snippet.publishedAt}</div> */}
              <div>{video.snippet.channelTitle}</div>
              <div>{video.snippet.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Homepage;
