import React, { Component } from "react";
import Axios from "axios";

export class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      channelId: this.props.match.params.channelId,
      channelProfileImg: "",
      channelUrl: "",
      commentCount: 0,
      comments: [],
      description: "",
      dislikeCount: 0,
      id: this.props.match.params.videoId,
      isLoading: false,
      likeCount: 0,
      pageToken: "",
      prevY: 0,
      publishDate: "",
      thumbnail: "",
      title: "",
      views: 0
    };
  }

  componentDidMount() {
    const url = "https://www.googleapis.com/youtube/v3/";
    const vdResrc = "videos?part=snippet%2CcontentDetails%2Cstatistics";
    const key = "key=AIzaSyAJz_naVGZdUyHKo66ByxZO4zNtGW0k2Ng";
    const apiUrl = url + vdResrc + "&id=" + this.state.id + "&" + key;
    // Channel endpoint
    // const channelRsrc = "channels";
    // const channelIdParam = "?id=";
    // const channelParams = "&part=contentDetails";
    // const channelUrl =
    //   url + channelRsrc + channelIdParam + this.state.channelId + channelParams;
    // Comments Endpoint
    const commentsRsrc = "commentThreads";
    const commentsParameters = "&textFormat=plainText&part=snippet&videoId=";
    let commentUrl =
      url + commentsRsrc + "?" + key + commentsParameters + this.state.id;
    this.setState({
      isLoading: true
    });
    // Fetches
    Axios.all([
      Axios.get(apiUrl),
      // Axios.get(channelUrl),
      Axios.get(commentUrl)
    ]).then(
      Axios.spread(
        (
          dataResponse,
          // channelResponse,
          commentsResponse
        ) => {
          // console.log(dataResponse);
          // console.log(dataResponse.data.items[0].snippet);
          // console.log(channelResponse);
          let publishDate = new Date(
            dataResponse.data.items[0].snippet.publishedAt
          );
          const options = { month: "long" };
          this.setState({
            channel: dataResponse.data.items[0].snippet.channelTitle,
            // TODO add profile image and url links
            channelProfileImg: "",
            channelUrl: "",
            commentCount: dataResponse.data.items[0].statistics.commentCount,
            comments: [...this.state.comments, ...commentsResponse.data.items],
            description: dataResponse.data.items[0].snippet.description,
            dislikeCount: dataResponse.data.items[0].statistics.dislikeCount,
            isLoading: false,
            likeCount: dataResponse.data.items[0].statistics.likeCount,
            pageToken: commentsResponse.data.nextPageToken,
            publishDate:
              new Intl.DateTimeFormat("en-US", options).format(publishDate) +
              " " +
              `${publishDate.getDate()}, ${publishDate.getFullYear()}`,
            title: dataResponse.data.items[0].title,
            views: dataResponse.data.items[0].statistics.viewCount
          });
          console.log(this.state.comments.length);
        }
      )
    );
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

  getComments(pageToken) {
    console.log(pageToken);
    if (pageToken !== this.state.pageToken) {
      // Comments Endpoint
      const url = "https://www.googleapis.com/youtube/v3/";
      const key = "key=AIzaSyAJz_naVGZdUyHKo66ByxZO4zNtGW0k2Ng";
      const commentsRsrc = "commentThreads";
      const commentsParameters = "&textFormat=plainText&part=snippet&videoId=";
      let pageTokenParam = `&pageToken=${pageToken}`;
      let commentUrl =
        url +
        commentsRsrc +
        "?" +
        key +
        commentsParameters +
        this.state.id +
        pageTokenParam;
      this.setState({
        isLoading: true
      });
      Axios.get(commentUrl).then(commentResponse => {
        console.log(commentResponse);
        this.setState({
          comments: [...this.state.comments, ...commentResponse.data.items]
        });
        if (commentResponse.data.nextPageToken) {
          this.setState({
            pageToken: commentResponse.data.nextPageToken
          });
        }
        this.setState({
          isLoading: false
        });
        console.log(this.state.comments.length);
      });
    }
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.pageToken;
      if (curPage) {
        this.getComments(curPage);
      }
    }
    this.setState({ prevY: y });
  }

  render() {
    return (
      <div className="item-background">
        <div>
          <div>
            <iframe
              className="video-align"
              src={`https://www.youtube.com/embed/${this.state.id}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              title={this.state.title}
            ></iframe>
          </div>
          <div className="video-primary-info-renderer left-text-align">
            <a
              className="remove-underline"
              href={`https://www.youtube.com/watch?v=${this.state.id}`}
            >
              <h1 className="title title-spacing">{this.state.title}</h1>
            </a>
            <div className="video-details">
              <span>{this.state.views} views</span>
              <span className="endpoint-color"> • </span>
              <span>{this.state.publishDate}</span>
            </div>
            <div className="count-details">
              <span className="count-offset">
                {" "}
                {this.state.likeCount} Likes{" "}
              </span>
              <span> {this.state.dislikeCount} Dislikes </span>
            </div>
          </div>
          <div className="channel-container">
            <a className="remove-underline" href={`${this.state.channelUrl}`}>
              {/* <img
                className="profile-img"
                src={`${this.state.channelProfileImg}`}
                alt={this.state.channelId}
              /> */}
              <h4 className="title title-spacing">{this.state.channel}</h4>
            </a>
          </div>
          <div className="title video-secondary-info-renderer">
            {this.state.description}
          </div>
        </div>
        <h2 className="total-comments-header">
          {this.state.commentCount} Comments
        </h2>
        <div>
          {this.state.comments.map(comment => {
            return (
              <div className="comment-thread" key={comment.id}>
                <a
                  href={`${comment.snippet.topLevelComment.snippet.authorChannelUrl}`}
                >
                {comment.snippet.topLevelComment.snippet.authorProfileImageUrl ?
                  (<img
                    className="profile-img"
                    src={`${comment.snippet.topLevelComment.snippet.authorProfileImageUrl}`}
                    alt={
                    comment.snippet.topLevelComment.id}
                    //     .value
                    // }
                  />
                  ) : (<span></span>)
                }
                </a>
                <div className="comment-renderer">
                  <div className="header-container">
                    {comment.snippet.topLevelComment.snippet
                      .authorChannelUrl ? (
                      <a
                        className="remove-underline"
                        href={`${comment.snippet.topLevelComment.snippet.authorChannelUrl}`}
                      >
                        <span className="author-header">
                          {
                            comment.snippet.topLevelComment.snippet
                              .authorDisplayName
                          }
                        </span>
                      </a>
                    ) : (
                      <span className="author-header">
                        {
                          comment.snippet.topLevelComment.snippet
                            .authorDisplayName
                        }
                      </span>
                    )}
                    <span className="endpoint-color">
                      {comment.snippet.topLevelComment.snippet.publishedAt}
                    </span>
                  </div>
                  <div className="title">
                    {comment.snippet.topLevelComment.snippet.textDisplay}
                  </div>
                  <div className="comment-counts">
                    {comment.snippet.topLevelComment.snippet.likeCount ? (
                      <span>
                        {comment.snippet.topLevelComment.snippet.likeCount}{" "}
                        Likes
                      </span>
                    ) : (
                      <span></span>
                    )}
                    {comment.snippet.topLevelComment.snippet.dislikeCount ? (
                      <span>
                        {comment.snippet.topLevelComment.snippet.dislikeCount}{" "}
                        Dislikes
                      </span>
                    ) : (
                      <span></span>
                    )}
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

export default Watch;
