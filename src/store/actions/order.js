import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const purchaseSandwichStart = () => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_START,
  };
};

export const purchaseSandwichSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseSandwichFail = (error) => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_FAIL,
    error: error,
  };
};

export const purchaseSandwich = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseSandwichStart());
    axios
      .post('/orders.json', orderData)
      .then((response) => {
        console.log(response);
        dispatch(purchaseSandwichSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseSandwichFail(error));
      });
  };
};
