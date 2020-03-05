import React, { Component } from "react";

export class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: this.props.match.params.channelTitle,
      title: this.props.match.params.title,
      thumbnail: "",
      id: this.props.match.params.videoId,
      description: "",
      views: 0
    };
  }

  componentDidMount() {
    const url = "https://www.googleapis.com/youtube/v3/";
    const vdResrc = "video";
    const key = "?key=" + process.env.REACT_APP_API_KEY;
    //  const parameters = "&part=snippet&type=video&q=
    const apiUrl = url + vdResrc + this.state.id + key;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          views: data.statistics.viewsCount
        });
          console.log(data.statistics);
        });
        console.log(this.state.views);
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
            <div>
                <span>{this.state.views} views</span>
            </div>
        <h4 className="title title-spacing">{this.state.channel}</h4>
      </div>
    );
  }
}

export default Watch;
