import "./App.css";
import React, { useState } from "react";
import CatForm from "./component/CatForm";
import Favorites from "./component/Favorites";
import MainCard from "./component/MainCard";
import Title from "./component/Title";
import { useEffect } from "react/cjs/react.development";

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

  const [counter, setCounter] = useState(() => {
    return jsonLocalStorage.getItem("counter");
  });

  const [mainCatImg, setMainCatImg] = useState(CAT1);

  const [favorites, setFavorites] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  // 앱 진입시 API를 불러 첫번째 고양이 이미지를 API의 고양이 사진으로 바꾸어주기
  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    console.log(newCat);
    setMainCatImg(newCat);
  }

  useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCatImg(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCatImg];
    // 기존에 있는 favorites 배열을 펼쳐서 쓴 다음 CAT3 를 이어 붙임
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const alreadyFavorite = favorites.includes(mainCatImg);

  const counterTitle = counter === null ? " " : counter + "번째";
  return (
    <div className='App'>
      <Title>{counterTitle} 고양이 가라사대</Title>
      <CatForm updateMainCat={updateMainCat} />
      <MainCard img={mainCatImg} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
