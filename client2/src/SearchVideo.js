import React, { useState } from "react";
import axios from "./axios";
import "./SearchVideo.css";

const SearchVideo = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchVideos = async (e) => {
    e.preventDefault();
    axios.get(`/search/${query}`).then((response) => {
      setResults(response.data);
      console.log(response.data);
    });
  };

  return (
    <div className="searchvideo">
      <h3>SearchVideo</h3>
      <form>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Enter Video Title or Description"
        />
        <button onClick={searchVideos}>Send</button>
      </form>
      <div>
        {results?.slice(0, 10).map((result) => (
          <div
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${result?.video_id}`,
                "_blank"
              )
            }
            className="searchvideo__result"
          >
            <b>Title</b>: {result.title}
            <br />
            <b>Description</b>:{" "}
            {result.description ? result.description : "N/A"}
            <div>
              <img
                src={`https://i.ytimg.com/vi/${result?.video_id}/default.jpg`}
                alt="Thumbnail"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchVideo;
