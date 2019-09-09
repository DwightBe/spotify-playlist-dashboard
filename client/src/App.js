import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Playlist from "./Pages/Playlist";
import Home from "./Pages/Home";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      loggedIn: false,
      items: []
    };
  }
  componentDidMount() {
    // Set token
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      // Set token
      this.setState({
        token,
        loggedIn: true
      });
      this.getPlaylists(token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  getPlaylists = token => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          items: response.items
        });
      })
      .catch(error => console.error("Error:", error));
  };
  render() {
    const { items, loggedIn, token } = this.state;
    return (
      <Router>
        <div>
          {!loggedIn && <a href="http://localhost:8888"> Login to Spotify </a>}
          <Route exact path="/" component={() => <Home items={items} />} />
          <Route
            path={"/playlist/:playlistId"}
            component={props => (
              <Playlist {...props} items={items} token={token} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
