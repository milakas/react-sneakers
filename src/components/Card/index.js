import styles from './Card.module.scss';
import React, { useState } from 'react';

function Card({
  id,
  title,
  price,
  imageUrl,
  addToCart,
  addToFavourites,
  favourite = false,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(favourite);

  const onClickPlus = () => {
    addToCart({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavourite = () => {
    addToFavourites({ id, title, imageUrl, price });
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favourite} onClick={onClickFavourite}>
        <img
          src={isFavourite ? '/img/liked.svg' : '/img/unliked.svg'}
          alt="unliked"
        />
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
