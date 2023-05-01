import styles from './Card.module.scss';
import React, { useState } from 'react';

function Card({ title, price, imageUrl, addToCart, addToFavourites }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    addToCart({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={addToFavourites}>
        <img src="/img/heart.svg" alt="unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
