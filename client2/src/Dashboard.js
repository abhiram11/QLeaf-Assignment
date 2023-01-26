import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [vidData, setVidData] = useState(null);
  const [page, setPage] = useState(1);
  // useEffect(() => {
  //   axios.get("/vids").then((response) => {
  //     setVidData(response.data);
  //     console.log(response.data);
  //   });
  // }, []);

  useEffect(() => {
    axios.get(`/vids/${page}`).then((response) => {
      setVidData(response.data);
      console.log(response.data);
    });
  }, [page]);

  return (
    <div className="dashboard">
      <h3>Dashboard</h3>
      {vidData?.slice(0, 4).map((data) => (
        <div
          onClick={() =>
            window.open(
              `https://www.youtube.com/watch?v=${data?.video_id}`,
              "_blank"
            )
          }
          className="dashboard__video"
        >
          <p>Published at: {data?.published_at}</p>
          <img
            src={`https://i.ytimg.com/vi/${data?.video_id}/default.jpg`}
            alt="Thumbnail"
          />
        </div>
      ))}
      <button onClick={() => setPage(page + 1)}>Next Page</button>
      <button onClick={() => setPage(1)}>Reset Pages</button>
    </div>
  );
};

export default Dashboard;
