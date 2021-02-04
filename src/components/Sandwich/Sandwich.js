import React from 'react';

import classes from './Sandwich.module.css';
import Ingredient from './Ingredient/Ingredient';

const Sandwich = ({ ingredients }) => {
  let transformedIngredients = ingredients
    ? Object.keys(ingredients)
        .map((igKey) => {
          return [...Array(ingredients[igKey])].map((_, idx) => (
            <Ingredient key={igKey + idx} type={igKey} />
          ));
        })
        .reduce((arr, el) => arr.concat(el), [])
    : [];

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
