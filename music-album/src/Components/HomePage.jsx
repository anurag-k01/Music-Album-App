import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function HomePage() {
  const [albums, setAlbums] = useState([]);
  const [querry, setQuerry] = useState("");
  const [filter, setFiler] = useState(3);
  const handleInput = (e) => {
    setQuerry(e.target.value);
  };
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
  };
  const filterByGenre = (querry) => {
    albums.map((el) => {
      if (querry == el.name) {
        return querry;
      } else {
        console.log("Not Found");
      }
    });
  };
  return (
    <>
      <Container>
        <div>
          <label>Search Album By Name: </label>
          <SearchBar value={querry} onInput={handleInput}></SearchBar>
        
          <button></button>
        </div>
        {/*<FilterByGenre>Filter By Genre</FilterByGenre*/}
        <Layout>
          {albums
            .filter((e) => (querry == "" ? true : e.name == querry))
            .map((el) => (
              <div key={el._id} onClick={() => getALbumID(el._id)}>
                <a href="/songs">
                  <div>{el.name}</div>
                  <Image src={el.cover_photo} />
                </a>
              </div>
            ))}
        </Layout>
      </Container>
    </>
  );
}
const Container = styled.div``;
const SearchBar = styled.input``;
const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  width: 70%;
  margin: 0 auto;
`;
const Image = styled.img`
  height: 200px;
  width: 200px;
`;

export default HomePage;
