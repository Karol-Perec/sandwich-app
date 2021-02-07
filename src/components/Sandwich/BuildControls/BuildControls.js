import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Ham', type: 'ham' },
];

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price,
  purchaseable,
  ordered,
  isAuthenticated
}) => {

  const buildControls = controls.map((control) => (
    <BuildControl
      key={control.label}
      label={control.label}
      added={() => ingredientAdded(control.type)}
      removed={() => ingredientRemoved(control.type)}
      disabled={disabled[control.type]}
    />
  ));

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>USD {price.toFixed(2)}</strong>
      </p>
      {buildControls}
      <button
        className={classes.OrderButton}
        disabled={!purchaseable}
        onClick={ordered}>
        {isAuthenticated ? 'ORDER NOW' : 'LOG IN TO ORDER'}
      </button>
    </div>
  );
};

export default BuildControls;
