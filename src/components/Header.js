import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';

const Header = ({ onClickCart }) => {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

  return (
    <header className="d-flex justify-between align-center flex-wrap p-40">
      <Link to="/" exact="true">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-15 cu-p">
          <Link to="/favourites" exact="true">
            <img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
          </Link>
        </li>

        <li className="cu-p">
          <img width={18} height={18} src="/img/user.svg" alt="Пользователь" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
