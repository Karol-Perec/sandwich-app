import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({ match, history, location }) => {
  const ingredients = useSelector((state) => state.sandwichBuilder.ingredients);
  const purchased = useSelector((state) => state.order.purchased)

  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data');
  };

  let checkoutSummary = <Redirect to='/' />;
  
  if (ingredients) {
    const purchasedRedirect = purchased ? <Redirect to='/'/> : null
    checkoutSummary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ingredients}
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinued={checkoutContinuedHandler}
        />
        <Route path={match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }

  return checkoutSummary;
};

export default Checkout;
