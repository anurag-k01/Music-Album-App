import axios from "axios";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

function HomePage() {
  const [albums, setAlbums] = useState([]);

  const [querry, setQuerry] = useState("");
    const [filter, setFilter] = useState(3);
    
  const handleInput = (e) => {
    setQuerry(e.target.value);
    };
    const filterByYear = () => {
      if (filter == 1) {
        setFilter(2);
      } else if (filter == 2) {
        setFilter(3);
      } else {
        setFilter(1);
      }
        // setFilter(1);
        // console.log(filter)
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
 
  function Data(albums) {
    if (albums.length == 0) {
      return <h1>No Results Found</h1>;
    }

    return albums.map((el) => (
      <div key={el._id} onClick={() => getALbumID(el._id)}>
        <a href="/songs">
          <div>{el.name}</div>
          <Image src={el.cover_photo} />
        </a>
      </div>
    ));
  }
  const getALbumID = (e) => {
    localStorage.setItem("albumId", e);
  };
   
  return (
    <>
      <Container>
        <div>
          <label>Search Album By Name: </label>
          <SearchBar value={querry} onInput={handleInput}></SearchBar>

                   <button onClick={filterByYear}>{filter==1?"Oldest First":filter==2?"Lateset First":"Sort By Year"}</button> 
        </div>

        <Layout>
          {Data(albums.filter((e) => (querry == "" ? true : e.name == querry)).sort((a,b)=>filter==1?a.year-b.year:filter==2?b.year-a.year:a.year==b.year))}
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
