import React from "react";

export default function MainCard({ img, onHeartClick }) {
  return (
    <div className='main-card'>
      <img src={img} alt='고양이' width='400' />
      <button onClick={onHeartClick}>🤍</button>
    </div>
  );
}
