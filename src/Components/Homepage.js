import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentPage: 1,
      isLoading: false,
      pageToken: "",
      prevY: 0
    };
  }

  componentDidMount() {
    this.getVideos(null);

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.pageToken;
      this.getVideos(curPage);
    }
    this.setState({ prevY: y });
  }

  getVideos(pageToken) {
    this.setState({
      isLoading: true
    });
    const url = "https://www.googleapis.com/youtube/v3/";
    const resrc = "search";
    const key = "?key=AIzaSyAJz_naVGZdUyHKo66ByxZO4zNtGW0k2Ng";
    const parameters = "&part=snippet&type=video";
    const maxResultsParam = "&maxResults=10";
    const orderParam = "&order=date";
    const pageTokenParam = "&pageToken=";
    let query = "&q=dogs";
    const apiUrl = pageToken
      ? `${url}${resrc}${key}${parameters}${query}${maxResultsParam}${orderParam}${pageTokenParam}${pageToken}`
      : `${url}${resrc}${key}${parameters}${query}${maxResultsParam}${orderParam}`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then(resp => resp.json())
      .then(data => {
        let oldToken = this.state.pageToken;
        if (!data.previousPageToken || data.nextPageToken === oldToken) {
          this.setState({
            pageToken: data.nextPageToken,
            currentPage: this.state.currentPage + 1,
            isLoading: false,
            videos: [...this.state.videos, ...data.items]
          });
        } else {
          this.setState({
            pageToken: data.nextPageToken
          });
          this.state.videos.push(data.items);
        }
      });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.videos.map((video, idx) => {
            return (
              <div className="box item-background" key={idx}>
                <div>
                  <Link
                    to={`/${video.snippet.channelId}/v=${video.id.videoId}`}
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
                    to={`/${video.snippet.channelId}/v=${video.id.videoId}`}
                  >
                    <h3 className="text-primary title title-spacing">
                      {video.snippet.title}
                    </h3>
                  </Link>
                  <div className="sub-headers">
                    <span className="endpoint-color title title-spacing">
                      {video.snippet.channelTitle}
                    </span>
                    <span className="endpoint-color">•</span>
                    <Link
                      className="title"
                      to={`/${video.snippet.channelId}/v=${video.id.videoId}`}
                    >
                      <span className="endpoint-color title title-spacing">
                        {video.snippet.publishedAt}
                      </span>
                    </Link>
                  </div>
                  <div className="primary-color description-text title">
                    {video.snippet.description}
                  </div>
                </div>
              </div>
            );
          })}
          <div
            ref={loadingRef => (this.loadingRef = loadingRef)}
            //style={loadingCSS}
          >
            <span
            //style={loadingTextCSS}
            >
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
