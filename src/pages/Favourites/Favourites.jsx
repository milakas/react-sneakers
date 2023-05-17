import React from 'react';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import Card from '../../components/Card';
import AppContext from '../../context';

import bemCreator from '../../components/bemCreator';

import './Favourites.scss';

const cn = bemCreator('page-favourites');

const Favourites = ({ onRemoveFavourite, onAddToCart, isLoading }) => {
  const { favorites } = React.useContext(AppContext);

  const renderItems = () => {
    return (isLoading ? [...Array(4)] : favorites).map((item, index) => (
      <Grid key={index} item xs={6} sm={4} md={4} lg={4}>
        <Card
          key={item.id}
          favorited={true}
          addToCart={onAddToCart}
          loading={isLoading}
          {...item}
        />
        <IconButton
          className={cn('delete')}
          onClick={() => onRemoveFavourite(item)}
          title="Удалить"
        >
          <ClearIcon color="inherit" />
        </IconButton>
      </Grid>
    ));
  };

  return (
    <section className={cn()}>
      <div className={cn('wrap')}>
        <h1 className={cn('title')}>Мои закладки</h1>
      </div>
      {favorites.length > 0 ? (
        <>
          <div className={cn('cards')}>
            <Grid container spacing={2}>
              {renderItems()}
            </Grid>
          </div>
        </>
      ) : (
        <h3>У вас нет закладок </h3>
      )}
    </section>
  );
};

export default Favourites;
