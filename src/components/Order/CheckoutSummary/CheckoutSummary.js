import React from 'react';

import Sandwich from '../../Sandwich/Sandwich';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({
  ingredients,
  onCheckoutCancelled,
  onCheckoutContinued,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it testes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Sandwich ingredients={ingredients} />
      </div>
      <Button buttonType='Danger' onClick={onCheckoutCancelled}>
        CANCEL
      </Button>
      <Button buttonType='Success' onClick={onCheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
