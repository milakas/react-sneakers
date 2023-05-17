import Card from '../../components/Card';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import bemCreator from '../../components/bemCreator';

import './Home.scss';

const cn = bemCreator('page-home');

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '0ch',
      '&:focus': {
        width: '12ch',
      },
    },
  },
}));

const Home = ({
  items,
  searchValue,
  onChangeSearchValue,
  onFavourite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavourite={onFavourite}
        addToCart={onAddToCart}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className={cn()}>
      <div className={cn('container')}></div>
      <div className={cn('wrap')}>
        <div className={cn('title-wrap')}>
          <h1 className={cn('title')}>Все кроссовки</h1>

          {searchValue ? (
            <p className={cn('search-text')}>
              Поиск по запросу:
              {searchValue.length < 10
                ? ' ' + searchValue
                : ' ' + searchValue.substring(0, 10) + '...'}
            </p>
          ) : (
            ''
          )}
        </div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Поиск…"
            inputProps={{ 'aria-label': 'Поиск' }}
            onChange={onChangeSearchValue}
            value={searchValue}
          />
        </Search>
      </div>

      <div>{renderItems()}</div>
    </div>
  );
};

export default Home;
