import React, { Component } from "react";

export class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      title: "",
      thumbnail: "",
      id: 0,
      description: ""
    };
  }

  render() {
    return <div>Coming soon...</div>;
  }
}

export default Video;
