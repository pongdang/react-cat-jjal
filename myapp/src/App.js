import "./App.css";
import React, { useState } from "react";
import CatForm from "./component/CatForm";
import Favorites from "./component/Favorites";
import MainCard from "./component/MainCard";
import Title from "./component/Title";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

function App() {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  // const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  // const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = useState(jsonLocalStorage.getItem("counter"));
  const [mainCatImg, setMainCatImg] = useState(CAT1);
  const [favorites, setFavorites] = useState(jsonLocalStorage.getItem("favorites") || []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCatImg(newCat);
    const nextCounter = counter + 1;
    setCounter(nextCounter);
    jsonLocalStorage.setItem("counter", nextCounter);
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCatImg];
    // 기존에 있는 favorites 배열을 펼쳐서 쓴 다음 CAT3 를 이어 붙임
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }
  return (
    <div className='App'>
      <Title>{counter}번째 고양이 가라사대</Title>
      <CatForm updateMainCat={updateMainCat} />
      <MainCard img={mainCatImg} onHeartClick={handleHeartClick} />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
