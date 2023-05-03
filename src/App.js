import React, { useState, useEffect } from 'react';
import './App.css';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_ITEMS_API).then(({ data }) => {
      setItems(data);
    });
    axios
      .get(process.env.REACT_APP_CART_API)
      .then(({ data }) => setCartItems(data));
    axios
      .get(process.env.REACT_APP_FAVOURITES_API)
      .then(({ data }) => setFavorites(data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post(process.env.REACT_APP_CART_API, obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`${process.env.REACT_APP_CART_API}/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavourite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`${process.env.REACT_APP_FAVOURITES_API}/${obj.id}`);
      } else {
        const { data } = await axios.post(
          process.env.REACT_APP_FAVOURITES_API,
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error('Не удалось добавить в избранное.', error);
    }
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
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
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onChangeSearchValue={onChangeSearchValue}
              onFavourite={onFavourite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favourites"
          exact
          element={
            <Favourites
              items={favorites}
              addToFavourites={onFavourite}
              onAddToCart={onAddToCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
