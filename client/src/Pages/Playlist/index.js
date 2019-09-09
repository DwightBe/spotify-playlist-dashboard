import React, { Component } from "react";
import styled from "styled-components";
import v4 from "uuid";

const SinglePlaylistItem = styled.div`
  margin: 0 auto;
  color: white;
  padding: 1em 2em;
  width: 400px;
  text-align: center;
`;

const PlaylistTracks = styled.ul`
  text-align: left;
  li {
    line-height: 40px;
    width: 400px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #404040;
  }
  button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

const TrackName = styled.span`
  font-weight: bold;
`;

class Playlist extends Component {
  constructor(props) {
    super();
    const { items, match, token } = props;
    let item;
    item = items.filter(item => match.params.playlistId === item.id)[0];
    this.state = {
      tracks: null,
      playlistId: match.params.playlistId,
      item,
      token
    };
  }
  componentDidMount() {
    this.getPlaylist();
  }
  getPlaylist = () => {
    const { token, playlistId } = this.state;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          tracks: response.tracks.items
        });
      })
      .catch(error => console.error("Error:", error));
  };

  deleteTrack = e => {
    let id = e.target.id;
    let index = e.target.value;
    console.log(id, index);
    const { token, playlistId } = this.state;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        tracks: [
          {
            uri: `spotify:track:${id}`,
            positions: [parseInt(index)]
          }
        ]
      })
    })
      .then(res => res.json())
      .then(response => {
        this.getPlaylist();
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    const { item, tracks } = this.state;
    return (
      <SinglePlaylistItem>
        {item && (
          <div>
            <h1>{item.name}</h1>
            <img src={item.images[0].url} height="200" />
            <PlaylistTracks>
              {tracks &&
                tracks.map((track, idx) => (
                  <li key={v4()}>
                    <span>
                      <TrackName>{track.track.name}</TrackName> -{" "}
                      {track.track.artists[0].name}
                    </span>
                    <button
                      id={track.track.id}
                      value={idx}
                      onClick={this.deleteTrack}
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </PlaylistTracks>
          </div>
        )}
      </SinglePlaylistItem>
    );
  }
}

export default Playlist;
