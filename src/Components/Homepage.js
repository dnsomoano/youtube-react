import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentPage: 1,
      pageToken: "",
      isLoading: false,
    };
    this.onScroll = this.onScroll.bind(this);
  }


  componentDidMount() {
    this.fetchVideos(null);
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
    this.setState({
      isLoading: false,
    });
  }

  onScroll = () => {
    //
    this.setState({ isLoading: false });
    console.log(window.innerHeight + window.scrollY);
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.state.videos.length && !this.state.isLoading) {
      this.onPaginatedSearch();
    }
  }

  onPaginatedSearch = (event) => {
    //
    this.setState({ isLoading: true,});
    this.fetchVideos(this.state.pageToken);
    window.scrollTo(0,0);
    //window.scrollTo(0,window.scrollY);
  }

  fetchVideos(pageToken) {
    const url = "https://www.googleapis.com/youtube/v3/search?key=";
    const key = process.env.REACT_APP_API_KEY;
    const parameters = "&part=snippet&type=video&q=";
    let query = "dogs";
    const apiUrl = pageToken ? url + key + parameters + query + "&maxResults=10&order=date&pageToken=" + pageToken
      : url + key + parameters + query + "&maxResults=10&order=date";
    console.log(apiUrl);
    fetch(apiUrl)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          //isLoading: true,
          videos: data.items,
          pageToken: data.nextPageToken,
          currentPage: this.state.currentPage + 1,
        });
        //console.log(data);
        // console.log(data.items);
        //console.log(this.state.currentPage);
      });
  }

  render() {
    return (
      <div>
        <div className="interactions">
          {this.state.isLoading && <span>Loading...</span>}
        </div>
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
                    <h3 className="text-primary title title-spacing">{video.snippet.title}</h3>
                  </Link>
                  <div className="sub-headers">
                    <span className="endpoint-color title title-spacing">
                      {video.snippet.channelTitle}
                    </span>
                    <span className="endpoint-color">
                    •
                    </span>
                  <Link
                    className="title"
                    to={`/${video.snippet.channelTitle}/${video.snippet.title}/v=${video.id.videoId}`}
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
        </div>
      </div>
    );
  }
}

export default Homepage;
