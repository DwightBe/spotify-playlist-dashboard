import React from "react";
import { Link } from "react-router-dom";
import v4 from "uuid";
import styled from "styled-components";

const PlaylistItems = styled.div`
  background: transparent;
  color: white;
  padding: 1em 2em;
`;

const PlaylistItem = styled.div`
  border-bottom: 1px solid #404040;
  display: flex;
  padding: 10px;
  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const PlaylistTitle = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  a {
    width: 100%;
    line-height: 100px;
    height: 100px;
  }
`;

const Home = ({ items }) => {
  return (
    <PlaylistItems>
      {items.length > 0 && <h1> {items[0].owner.display_name}'s Playlists </h1>}
      {items.map((item, i) => (
        <PlaylistItem key={v4()}>
          <img src={item.images[0].url} height="100" />
          <PlaylistTitle>
            <Link to={`/playlist/${item.id}`}>{item.name}</Link>
          </PlaylistTitle>
        </PlaylistItem>
      ))}
    </PlaylistItems>
  );
};
export default Home;
