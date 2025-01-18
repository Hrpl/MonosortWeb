import React from 'react';
import './MenuItem.css';

function MenuItem({ image, title, price }) {
  return (
    <div className="menu-item">
      <img src={image} alt={title} className="menu-item-image"/>
      <div className="menu-item-price">{price} ₽</div>
    </div>
  );
}

export default MenuItem;