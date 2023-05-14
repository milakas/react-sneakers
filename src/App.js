import React, { useState, useEffect } from 'react';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartItemsResponse = await axios.get(
        'https://644f7645ba9f39c6ab642b2f.mockapi.io/cart'
      );
      const favouritesResponse = await axios.get(
        'https://644fcf81ba9f39c6ab6cfe47.mockapi.io/favourite'
      );
      const itemsResponse = await axios.get(
        'https://644f7645ba9f39c6ab642b2f.mockapi.io/items'
      );

      setIsLoading(false);
      setCartItems(cartItemsResponse.data);
      setFavorites(favouritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://644f7645ba9f39c6ab642b2f.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post('https://644f7645ba9f39c6ab642b2f.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://644f7645ba9f39c6ab642b2f.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => +item.id !== +id));
  };

  const onFavourite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(
          `https://644fcf81ba9f39c6ab6cfe47.mockapi.io/favourite/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          'https://644fcf81ba9f39c6ab6cfe47.mockapi.io/favourite',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error('Не удалось добавить товар в избранное.', error);
    }
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{ items, cartItems, favorites, isItemAdded, isItemFavorite }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            exact="true"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchValue={onChangeSearchValue}
                onFavourite={onFavourite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favourites"
            exact="true"
            element={
              <Favourites
                addToFavourites={onFavourite}
                onAddToCart={onAddToCart}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
