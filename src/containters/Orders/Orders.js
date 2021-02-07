import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import classes from './Orders.module.css';

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchOrders(token, userId));
  }, [dispatch, token, userId]);

  let ordersList = <Spinner />;
  if (!loading) {
    ordersList = (
      <div className={classes.Orders}>
        {orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
  return ordersList;
};

export default withErrorHandler(Orders, axios);
