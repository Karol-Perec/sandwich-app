import React from 'react';
import PropTypes from 'prop-types';

import classes from './Ingredient.module.css';

export const ingredientTypes = {
  breadBottom: 'bread-bottom',
  breadTop: 'bread-top',
  ham: 'ham',
  cheese: 'cheese',
  bacon: 'bacon',
  salad: 'salad',
};

const Ingredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case ingredientTypes.breadBottom:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case ingredientTypes.breadTop:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case ingredientTypes.ham:
      ingredient = <div className={classes.Ham}></div>;
      break;
    case ingredientTypes.cheese:
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case ingredientTypes.bacon:
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case ingredientTypes.salad:
      ingredient = <div className={classes.Salad}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

Ingredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Ingredient;
