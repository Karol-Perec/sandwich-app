import React from 'react';

import classes from './Order.module.css';

const Order = ({ ingredients, price }) => {
  const ingredientsInfo = Object.entries(ingredients).map((ig) => {
    const ingredientInfo = ig[1] ? (
      <span key={ig[0]}>
        {ig[0]} ({ig[1]})
      </span>
    ) : null;
    return ingredientInfo;
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsInfo}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
