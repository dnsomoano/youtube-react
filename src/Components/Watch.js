import React, { Component } from "react";

export class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: this.props.match.params.channelTitle,
      title: this.props.match.params.title,
      thumbnail: "",
      id: this.props.match.params.videoId,
      description: ""
    };
  }

  render() {
    return (
      <div>
        <iframe
          width="920"
          height="518"
          src={`https://www.youtube.com/embed/${this.state.id}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title={this.state.title}
        ></iframe>
        <h1 className="title title-spacing">{this.state.title}</h1>
        <h4 className="title title-spacing">{this.state.channel}</h4>
      </div>
    );
  }
}

export default Watch;
