import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';
import Sandwich from '../../components/Sandwich/Sandwich';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const SandwichBuilder = ({ history }) => {
  const [purchasing, setPurchasing] = useState(false);

  const ingredients = useSelector((state) => state.sandwichBuilder.ingredients);
  const totalPrice = useSelector((state) => state.sandwichBuilder.totalPrice);
  const error = useSelector((state) => state.sandwichBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initIngredients());
  }, [dispatch]);

  const isPurchaseable = () => {
    const ingredientsSum = Object.values(ingredients).reduce(
      (sum, el) => sum + el,
      0
    );
    return ingredientsSum > 0;
  };

  const addIngredientHandler = (name) => {
    dispatch(actions.addIngredient(name));
  };

  const removeIngredientHandler = (name) => {
    dispatch(actions.removeIngredient(name));
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      history.push('/auth')
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    history.push('/checkout');
    dispatch(actions.purchaseInit());
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let sandwich = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (ingredients) {
    sandwich = (
      <>
        <Sandwich ingredients={ingredients} />{' '}
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchaseable={isPurchaseable()}
          ordered={purchaseHandler}
          isAuthenticated={isAuthenticated}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={totalPrice}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} onBackdropClick={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {sandwich}
    </>
  );
};

export default withErrorHandler(SandwichBuilder, axios);
