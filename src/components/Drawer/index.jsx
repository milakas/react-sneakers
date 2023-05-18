import React, { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Info from '../Info';
import bemCreator from '../bemCreator';
import { useCart } from '../../hooks/useCart';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

import './Drawer.scss';

const cn = bemCreator('component-drawer');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, items = [], onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useBodyScrollLock(opened);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(
        'https://644fcf81ba9f39c6ab6cfe47.mockapi.io/order',
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          'https://644f7645ba9f39c6ab642b2f.mockapi.io/cart/' + item.id
        );
        await delay(1000);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${cn('overlay')} ${opened ? cn('overlay--visible') : ''}`}>
      <div className={`${cn()} ${opened ? cn('active') : ''}`}>
        <div className={cn('wrap')}>
          <h2 className={cn('title')}>Корзина</h2>
          <IconButton onClick={onClose} title="Закрыть">
            <CloseIcon color="inherit" />
          </IconButton>
        </div>

        {items.length > 0 ? (
          <>
            <div className={cn('items')}>
              {items.map((obj) => (
                <div key={obj.id} className={cn('item')}>
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className={cn('image')}
                  ></div>
                  <div className={cn('item-info')}>
                    <h3 className={cn('item-title')}>{obj.title}</h3>
                    <span className={cn('item-price')}>{obj.price} ₽</span>
                  </div>
                  <div>
                    <IconButton
                      onClick={() => onRemove(obj.id)}
                      title="Закрыть"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className={cn('bottom-text')}>
                <span className={cn('total-price')}> Итого:</span>
                <div></div>
                <span className={cn('total-price')}>{totalPrice} ₽</span>
              </div>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={
              isOrderComplete
                ? '/img/complete-order.jpg'
                : '/img/empty-cart.jpg'
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
