import React, { Component } from "react";

export class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: this.props.match.params.channelTitle,
      description: "",
      id: this.props.match.params.videoId,
      publishDate: "",
      thumbnail: "",
      title: this.props.match.params.title,
      views: 0
    };
  }

  componentDidMount() {
    const url = "https://www.googleapis.com/youtube/v3/";
    const vdResrc = "videos?part=snippet%2CcontentDetails%2Cstatistics";
    const key = "&key=AIzaSyAJz_naVGZdUyHKo66ByxZO4zNtGW0k2Ng";
    const apiUrl = url + vdResrc + "&id=" + this.state.id + key;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let publishDate = new Date(data.items[0].snippet.publishedAt);
        const options = { month: "long" };
        this.setState({
          description: data.items[0].snippet.description,
          publishDate:
            new Intl.DateTimeFormat("en-US", options).format(publishDate) +
            " " +
            `${publishDate.getDate()}, ${publishDate.getFullYear()}`,
          views: data.items[0].statistics.viewCount
        });
      });
    // console.log(this.state.views);
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
      </div>
    );
  }
}

export default Watch;
