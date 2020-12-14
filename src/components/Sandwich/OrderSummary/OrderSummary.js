import React from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  price,
  purchaseCancelled,
  purchaseContinued,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((ingredientKey) => (
    <li key={ingredientKey}>
      <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>:{' '}
      {ingredients[ingredientKey]}
    </li>
  ));
  return (
    <>
      <h3>Your Order</h3>
      <p>Your best personalized sandwich includes: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {price.toFixed(2)}</strong>
      </p>
      <p>Proceed to Checkout?</p>
      <Button buttonType='Danger' onClick={purchaseCancelled}>
        CANCEL
      </Button>
      <Button buttonType='Success' onClick={purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
