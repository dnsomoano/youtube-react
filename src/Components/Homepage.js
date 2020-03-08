import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
// import InfiniteLoading from "react-simple-infinite-loading";
//import InfiniteScroll from "react-infinite-scroller";

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
    // this.onScroll = this.onScroll.bind(this);
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
    // window.addEventListener('scroll', this.onScroll, false);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      //const lastVideo = this.state.videos[this.state.videos.length - 1];
      const curPage = this.state.nextPageToken;
      this.getVideos(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.onScroll, false);
  //   this.setState({
  //     isLoading: false,
  //   });
  // }

  // onScroll = () => {
  //   //
  //   this.setState({ isLoading: false });
  //   console.log(window.innerHeight + window.scrollY);
  //   if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
  //     this.state.videos.length && !this.state.isLoading) {
  //     this.onPaginatedSearch();
  //   }
  // }

  // onPaginatedSearch = (event) => {
  //   //
  //   this.setState({ isLoading: true,});
  //   this.fetchVideos(this.state.pageToken);
  //   window.scrollTo(0,0);
  //   //window.scrollTo(0,window.scrollY);
  // }

  getVideos(pageToken) {
    const url = "https://www.googleapis.com/youtube/v3/";
    const resrc = "search";
    const key = "?key=" + process.env.REACT_APP_API_KEY;
    const parameters = "&part=snippet&type=video";
    let query = "dogs";
    const apiUrl = pageToken
      ? url +
        resrc +
        key +
        parameters +
        +"&q=" +
        query +
        "&maxResults=10&order=date&pageToken=" +
        pageToken
      : url +
        resrc +
        key +
        parameters +
        "&q=" +
        query +
        "&maxResults=10&order=date";
    console.log(apiUrl);
    fetch(apiUrl)
      .then(resp => resp.json())
      .then(data => {
        let oldToken = this.state.pageToken;
        if (!data.nextPageToken || data.nextPageToken === oldToken) {
          this.state.videos.push(data.items);
          this.setState({
            pageToken: data.nextPageToken,
            currentPage: this.state.currentPage + 1,
            isLoading: false
          });
        } else {
          this.setState({
            videos: data.items,
            pageToken: data.nextPageToken
          });
        }
        // if (!this.setState.pageToken || this.state.pageToken === oldToken) {
        //   this.setState({
        //     isLoading: false
        //   });
        // }
        //console.log(data);
        // console.log(data.items);
        //console.log(this.state.currentPage);
      });
  }

  render() {
    const loader = (
      <div className="interactions">
        {this.state.isLoading && <span>Loading...</span>}
      </div>
    );
    return (
      <div>
        <div>
          {/* <InfiniteScroll
            items={this.state.videos}
            //itemHeight={138}
            hasMoreItems={this.state.isLoading}
            loadMoreItems={this.fetchVideos(this.state.pageToken)}
            loader={loader}
            useWindow={true}
          > */}
          {this.state.videos.map((video, idx) => {
            return (
              <div className="box">
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
