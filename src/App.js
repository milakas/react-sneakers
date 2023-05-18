import React, { useState, useEffect } from 'react';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Favourites from './pages/Favourites/Favourites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartItemsResponse, favouritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://644f7645ba9f39c6ab642b2f.mockapi.io/cart'),
            axios.get('https://644fcf81ba9f39c6ab6cfe47.mockapi.io/favourite'),
            axios.get('https://644f7645ba9f39c6ab642b2f.mockapi.io/items'),
          ]);

        setIsLoading(false);
        setCartItems(cartItemsResponse.data);
        setFavorites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных.');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItems = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItems) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://644f7645ba9f39c6ab642b2f.mockapi.io/cart/${findItems.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://644f7645ba9f39c6ab642b2f.mockapi.io/cart',
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении товара в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
      axios.delete(`https://644f7645ba9f39c6ab642b2f.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Ошибка при удалении товара из корзины');
      console.error(error);
    }
  };

  const onFavourite = async (obj) => {
    console.log('onFavourite', obj);
    try {
      const findItems = favorites.find(
        (favObj) => Number(favObj.parentId) === Number(obj.id)
      );
      if (findItems) {
        await axios.delete(
          `https://644fcf81ba9f39c6ab6cfe47.mockapi.io/favourite/${findItems.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.parentId) !== obj.id)
        );
      } else {
        setFavorites((prev) => [...prev, obj]);

        const { data } = await axios.post(
          'https://644fcf81ba9f39c6ab6cfe47.mockapi.io/favourite',
          obj
        );
        setFavorites((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );

        console.log('data', data);
      }
    } catch (error) {
      alert('Не удалось добавить товар в избранное.');
      console.error(error);
    }
  };

  const onRemoveFavourite = async (obj) => {
    console.log('remove', obj);
    try {
      setFavorites((prev) =>
        prev.filter((item) => Number(item.parentId) !== obj.parentId)
      );
      console.log(favorites);
      await axios.delete(
        `https://644fcf81ba9f39c6ab6cfe47.mockapi.io/favourite/${obj.id}`
      );
      console.log(favorites);
    } catch (error) {
      alert('Не удалось удалить товар из избранного.');
      console.error(error);
    }
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onFavourite,
        onAddToCart,
        isItemFavorite,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header
          cartOpened={cartOpened}
          onClickCart={() => setCartOpened(true)}
        />
        <main className={`main-content ${cartOpened ? 'blur' : ''}`}>
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
              element={<Favourites onRemoveFavourite={onRemoveFavourite} />}
            />
            <Route path="/orders" exact="true" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
