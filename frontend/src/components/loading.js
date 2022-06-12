import React from "react";
import loadingGif from "../assets/loadingGif.gif";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadingGif} alt="Loading..."></img>
    </div>
  );
};

export default Loading;
