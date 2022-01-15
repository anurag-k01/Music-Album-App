import axios from "axios";
import React, { useEffect,useState } from "react";

function Songs() {
    let albumId = localStorage.getItem("albumId");
    document.title="Songs"
    const[songs,setSongs]=useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${albumId}`)
      .then((res) => {
        setSongs(res.data.songs);
      })
      .catch((err) => {
        console.log("Something went wrong while fetching album songs");
        console.log(err);
      });
  }, []);
  return (<>
      {songs.map((el) => (<div key={el._id}>
      <div>{el.name}</div>
      </div>))}
    
  </>);
}

export default Songs;
