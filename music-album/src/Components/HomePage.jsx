import axios from "axios";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function HomePage() {
  const [albums, setAlbums] = useState([]);

  const [querry, setQuerry] = useState("");
  const [filter, setFilter] = useState(3);
  const [total, setTotal] = useState(0);
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
        setTotal(res.data.length);
        console.log("albums", albums);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function Data(albums) {
    if (albums.length == 0) {
      return (
        <div>
          <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
          <h2>Loading</h2>
        </div>
      );
    }

    return albums.map((el) => (
      <div key={el._id} onClick={() => getALbumID(el._id)}>
        <Link to={`/${el._id}`}>
          <div>
            {el.name}:- {el.length} Songs
          </div>
          <span></span>
          <Image src={el.cover_photo} />
        </Link>
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
          <div>
            <button onClick={filterByYear}>
              {filter == 1
                ? "Oldest First"
                : filter == 2
                ? "Lateset First"
                : "Sort By Year"}
            </button>
          </div>{" "}
        </div>

        <Layout>
          {Data(
            albums
              .filter((e) => (querry == "" ? true : e.name == querry))
              .sort((a, b) =>
                filter == 1
                  ? a.year - b.year
                  : filter == 2
                  ? b.year - a.year
                  : a.year == b.year
              )
          )}
        </Layout>
      </Container>
    </>
  );
}
const Container = styled.div`
  border: 1px solid black;
  width: 80%;

  margin: 0 auto;
`;
const SearchBar = styled.input`
  width: 30%;
  padding: 8px;
  margin: 0 auto;
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  width: 70%;
  margin: 0 auto;
  border: 1px solid black;
  padding: 30px;
`;
const Image = styled.img`
  height: 200px;
  width: 200px;
`;

export default HomePage;
