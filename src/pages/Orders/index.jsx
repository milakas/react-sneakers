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
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  const groupedOrders = orders.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = [];
    }
    acc[item.id].push(item);
    return acc;
  }, {});

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
      ) : Object.keys(groupedOrders).length > 0 ? (
        Object.keys(groupedOrders).map((orderId) => (
          <div key={orderId}>
            <h3>Заказ № {orderId}</h3>
            <Grid container spacing={2}>
              {groupedOrders[orderId].map((product) => (
                <Grid key={product.parentId} item xs={6} sm={4} md={4} lg={4}>
                  <Card {...product} />
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
