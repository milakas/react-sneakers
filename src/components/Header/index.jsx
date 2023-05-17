import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import bemCreator from '../bemCreator';
import AppContext from '../../context';

import './Header.scss';

const cn = bemCreator('component-header');

const Header = ({ onClickCart }) => {
  const { cartItems } = React.useContext(AppContext);
  const sumCartItems = cartItems.reduce((minId, item) => {
    return item.id > minId ? item.id : minId;
  }, 0);

  return (
    <header className={cn()}>
      <Link to="/" exact="true">
        <div className={cn('wrap-logo')}>
          <h3 className={cn('title')}>React Sneakers</h3>
        </div>
      </Link>
      <ul className={cn('links')}>
        <li onClick={onClickCart} className={cn('link')}>
          <IconButton aria-label="Корзина" color="inherit">
            {sumCartItems > 0 ? (
              <Badge badgeContent={sumCartItems} color="error">
                <LocalMallOutlinedIcon />
              </Badge>
            ) : (
              <LocalMallOutlinedIcon />
            )}
          </IconButton>
        </li>

        <li className={cn('link')}>
          <Link to="/favourites" exact="true">
            <IconButton aria-label="Вишлист" color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
          </Link>
        </li>

        <li className={cn('link')}>
          <Link to="/orders" exact="true">
            <IconButton aria-label="Профиль" color="inherit">
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
