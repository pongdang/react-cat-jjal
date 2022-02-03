import React from "react";

export default function MainCard({ img, onHeartClick, alreadyFavorite }) {
  const heartIcon = alreadyFavorite ? "❤️" : "🤍";
  return (
    <div className='main-card'>
      <img src={img} alt='고양이' width='400' />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
}
