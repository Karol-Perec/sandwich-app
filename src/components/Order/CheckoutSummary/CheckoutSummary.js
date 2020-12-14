import React from 'react';

import Sandwich from '../../Sandwich/Sandwich';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({
  ingredients,
  checkoutCancelled,
  checkoutContinued,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Sandwich ingredients={ingredients} />
      </div>
      <Button buttonType='Danger' onClick={checkoutCancelled}>
        CANCEL
      </Button>
      <Button buttonType='Success' onClick={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
