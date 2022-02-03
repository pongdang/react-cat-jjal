import React from "react";
import CatItem from "./CatItem";

export default function Favorites({ favorites }) {
  // 조건부 렌더링
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }
  return (
    <ul className='favorites'>
      {favorites.map((cat) => (
        // 리스트에 있는 모든 자식들은 유니크한 키라는 props가 있어야 한다.
        // 배열을 순회하는데 배열의 요소마다 id 값이 필요하다. 그래야 리액트에서 이 리스트를 잘 최적화해서 보여줄 수 있다..
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}
