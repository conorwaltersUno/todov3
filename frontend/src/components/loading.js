import React from "react";
import loadingGif from "../assets/loadingGif.gif";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadingGif}></img>
    </div>
  );
};

export default Loading;
