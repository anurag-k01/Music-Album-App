import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function Songs() {
  const { id } = useParams();
  
    document.title="Songs"
    const[songs,setSongs]=useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${id}`)
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
