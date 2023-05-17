import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './utils/searchInput';
import Card from '../../components/Card';
import bemCreator from '../../components/bemCreator';

import './Home.scss';

const cn = bemCreator('page-home');

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
      <Grid key={index} item xs={6} sm={4} md={4} lg={4}>
        <Card
          onFavourite={onFavourite}
          addToCart={onAddToCart}
          loading={isLoading}
          {...item}
        />
      </Grid>
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
      <div className={cn('cards')}>
        <Grid container spacing={2}>
          {renderItems()}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
