import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function HomePage() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        setAlbums(res.data);
        console.log("albums", albums);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    const getALbumID = (e) => {
        localStorage.setItem("albumId", e);
        
}
  return (
    <>
      <Container>
        <SearchBar></SearchBar>
        {albums.map((el) => (
          <a href="/songs">
            <div key={el._id} onClick={() => getALbumID(el._id)}>
              <div>{el.name}</div>
              <img src={el.cover_photo} />
            </div>
          </a>
        ))}
      </Container>
    </>
  );
}
const Container = styled.div`
`;
const SearchBar = styled.input``;

export default HomePage;
