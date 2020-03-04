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
        <h1>{this.state.title}</h1>
        <iframe
          width="1169"
          height="658"
          src={`https://www.youtube.com/embed/${this.state.id}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title={this.state.title}
        ></iframe>
        <header>{this.state.channel}</header>
      </div>
    );
  }
}

export default Watch;
