import Card from '../components/Card';

function Home({
  items,
  searchValue,
  onChangeSearchValue,
  onFavourite,
  onAddToCart,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between flex-wrap mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchValue}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue))
          .map((item, index) => (
            <Card
              key={index}
              addToFavourites={onFavourite}
              addToCart={onAddToCart}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
