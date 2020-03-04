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
              <div>
                <Link
                  to={`/${video.snippet.channelTitle}/${video.snippet.title}/v=${video.id.videoId}`}
                >
                  <img
                    className="thumbnail-size"
                    src={`${video.snippet.thumbnails.medium.url}`}
                    alt={video.id.videoId}
                  />
                </Link>
              </div>
              <div className="text-wrapper">
                <Link
                  className="title"
                  to={`/${video.snippet.channelTitle}/${video.snippet.title}/v=${video.id.videoId}`}
                >
                  <h3 className="title title-spacing">{video.snippet.title}</h3>
                </Link>
                <div className="sub-headers">
                  <span className="title title-spacing">
                    {video.snippet.channelTitle}
                  </span>
                  •
                  <span className="title title-spacing">
                    {video.snippet.publishedAt}
                  </span>
                </div>
                <div className="description-text title">
                  {video.snippet.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Homepage;
