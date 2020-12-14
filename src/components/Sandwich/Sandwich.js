import React from 'react';

import classes from './Sandwich.module.css';
import Ingredient from './Ingredient/Ingredient';

const Sandwich = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients)
    .map((ingredientName) => {
      return [...Array(ingredients[ingredientName])].map((_, idx) => (
        <Ingredient key={ingredientName + idx} type={ingredientName} />
      ));
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Sandwich}>
      <Ingredient type='bread-top' />
      {transformedIngredients}
      <Ingredient type='bread-bottom' />
    </div>
  );
};

export default Sandwich;
