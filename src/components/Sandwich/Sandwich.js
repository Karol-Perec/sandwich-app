import React from 'react';

import classes from './Sandwich.module.css';
import Ingredient from './Ingredient/Ingredient';

const sandwich = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((ingredientName) => {
      return [...Array(props.ingredients[ingredientName])].map((_, idx) => (
        <Ingredient key={ingredientName + idx} type={ingredientName} />
      ));
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Sandwich}>
      <Ingredient type="bread-top" />
      {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default sandwich;
