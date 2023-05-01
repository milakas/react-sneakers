import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios
      .get('https://644f7645ba9f39c6ab642b2f.mockapi.io/items')
      .then(({ data }) => {
        setItems(data);
      });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              addToFavourites={() => console.log('Добавили в закладки')}
              addToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
