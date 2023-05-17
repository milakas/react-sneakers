import React from 'react';
import ContentLoader from 'react-content-loader';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import AppContext from '../../context';
import bemCreator from '../bemCreator';

import './Card.scss';

const cn = bemCreator('card');

const Card = ({
  id,
  title,
  price,
  imageUrl,
  addToCart,
  onFavourite,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded, isItemFavorite } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };
  const onClickPlus = () => {
    addToCart(obj);
  };

  const onClickFavourite = () => {
    onFavourite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={cn()}>
      <div className={cn('wrap')}>
        {loading ? (
          <ContentLoader
            speed={2}
            viewBox="0 0 155 200"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="10" rx="10" ry="5" width="155" height="100" />
            <rect x="0" y="120" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="140" rx="5" ry="5" width="100" height="10" />
            <rect x="130" y="160" rx="5" ry="5" width="26" height="20" />
          </ContentLoader>
        ) : (
          <>
            <div className={cn('favorites')} onClick={onClickFavourite}>
              {onFavourite && (
                <>
                  {isItemFavorite(id) || isFavorite ? (
                    <IconButton className={cn('favorite')}>
                      <FavoriteIcon color="inherit" />
                    </IconButton>
                  ) : (
                    <IconButton className={cn('not-favorite')}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  )}
                </>
              )}
            </div>

            <img className={cn('image')} src={imageUrl} alt="Sneakers" />
            <div className={cn('bottom-text')}>
              <h4 className={cn('title')}>{title}</h4>
              <span className={cn('price')}>{price + ' ₽'}</span>
            </div>
            <div className={cn('add')} onClick={onClickPlus}>
              {addToCart && (
                <>
                  {isItemAdded(id) ? (
                    <IconButton>
                      <CheckCircleIcon color="success" />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <AddShoppingCartIcon />
                    </IconButton>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
