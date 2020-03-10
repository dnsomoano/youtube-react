import React, { Component } from "react";
import Axios from "axios";

export class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      comments: [],
      description: "",
      id: this.props.match.params.videoId,
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
    // Comments Endpoint
    const commentsRsrc = "commentThreads";
    const commentsParameters = "&textFormat=plainText&part=snippet&videoId=";
    let commentUrl =
      url + commentsRsrc + "?" + key + commentsParameters + this.state.id;
    Axios.all([Axios.get(apiUrl), Axios.get(commentUrl)]).then(
      Axios.spread((dataResponse, commentsResponse) => {
        let publishDate = new Date(
          dataResponse.data.items[0].snippet.publishedAt
        );
        const options = { month: "long" };
        this.setState({
          channel: dataResponse.data.items[0].snippet.channelTitle,
          comments: commentsResponse.data.items,
          description: dataResponse.data.items[0].snippet.description,
          publishDate:
            new Intl.DateTimeFormat("en-US", options).format(publishDate) +
            " " +
            `${publishDate.getDate()}, ${publishDate.getFullYear()}`,
          title: dataResponse.data.items[0].title,
          views: dataResponse.data.items[0].statistics.viewCount
        });
        console.log(commentsResponse);
        // console.log(this.state.comments);
      })
    );
  }

  render() {
    return (
      <div className="item-background">
        <div>
          <iframe
            className="video-align"
            width="920"
            height="518"
            src={`https://www.youtube.com/embed/${this.state.id}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            title={this.state.title}
          ></iframe>
          <div className="video-primary-info-renderer left-text-align">
            <h1 className="title title-spacing">{this.state.title}</h1>
            <span>{this.state.views} views</span>
            <span className="endpoint-color"> • </span>
            <span>{this.state.publishDate}</span>
          </div>
          <h4 className="title title-spacing">{this.state.channel}</h4>
          <div>{this.state.description}</div>
        </div>
        <h2 className="total-comments-header">Comments</h2>
        <div>
          {this.state.comments.map(comment => {
            return (
              <div className="comment-thread">
                <a
                  href={`${comment.snippet.topLevelComment.snippet.authorChannelUrl}`}
                >
                  <img
                    className="profile-img"
                    src={`${comment.snippet.topLevelComment.snippet.authorProfileImageUrl}`}
                    alt={
                      comment.snippet.topLevelComment.snippet.authorChannelId
                        .value
                    }
                  />
                </a>
                <div className="comment-renderer">
                  <div className="header-container">
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
                    <span className="endpoint-color">
                      {comment.snippet.topLevelComment.snippet.publishedAt}
                    </span>
                  </div>
                  <div>
                    {comment.snippet.topLevelComment.snippet.textDisplay}
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

export default Watch;
