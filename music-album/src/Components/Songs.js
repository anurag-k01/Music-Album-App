import React from "react";

function Songs() {
  let albumId = localStorage.getItem("albumId");

  return <div>{albumId}</div>;
}

export default Songs;
