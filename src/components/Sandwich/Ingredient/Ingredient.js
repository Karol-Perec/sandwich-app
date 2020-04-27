import React from 'react';
import PropTypes from 'prop-types';

import classes from './Ingredient.module.css';

const ingredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case 'bread-top':
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case 'ham':
      ingredient = <div className={classes.Ham}></div>;
      break;
    case 'cheese':
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case 'salad':
      ingredient = <div className={classes.Salad}></div>;
      break;
    case 'bacon':
      ingredient = <div className={classes.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

ingredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ingredient;
