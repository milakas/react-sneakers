import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';

import Card from '../../components/Card';
import bemCreator from '../../components/bemCreator';

import './Orders.scss';

const cn = bemCreator('page-orders');

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://644fcf81ba9f39c6ab6cfe47.mockapi.io/order'
        );
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  return (
    <section className={cn()}>
      <div className={cn('wrap')}>
        <h1 className={cn('title')}>Мои заказы</h1>
      </div>
      {isLoading ? (
        [...Array(1)].map((_, index) => (
          <div key={index}>
            <h3>Заказ № ...</h3>
            <Grid container spacing={2}>
              {[...Array(2)].map((__, index) => (
                <Grid key={index} item xs={6} sm={4} md={4} lg={4}>
                  <Card loading={isLoading} />
                </Grid>
              ))}
            </Grid>
          </div>
        ))
      ) : orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index}>
            <h3>Заказ № {order.id}</h3>
            <Grid container spacing={2}>
              {order.items.map((item, index) => (
                <Grid key={index} item xs={6} sm={4} md={4} lg={4}>
                  <Card {...item} />
                </Grid>
              ))}
            </Grid>
          </div>
        ))
      ) : (
        <h3>У вас нет заказов </h3>
      )}
    </section>
  );
};

export default Orders;
