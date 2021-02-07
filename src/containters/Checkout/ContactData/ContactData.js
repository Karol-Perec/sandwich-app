import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { has } from 'lodash';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index'
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FormInput from '../../../components/UI/FormInput/FormInput';

const ContactData = ({ history }) => {
  const ingredients = useSelector((state) => state.sandwichBuilder.ingredients);
  const totalPrice = useSelector((state) => state.sandwichBuilder.totalPrice);
  const loading = useSelector((state) => state.order.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    errors,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    const order = {
      ingredients: ingredients,
      price: totalPrice.toFixed(2),
      orderData: data,
      userId: userId,
    };
    dispatch(actions.purchaseSandwich(order, token));
  };

  let form = loading ? <Spinner/> : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        invalid={has(errors, 'name')}
        elementType='name'
        inputRef={register}
      />
      <FormInput
        invalid={has(errors, 'street')}
        elementType='street'
        inputRef={register}
      />
      <FormInput
        invalid={has(errors, 'zipCode')}
        elementType='zipCode'
        inputRef={register}
      />
      <FormInput
        invalid={has(errors, 'email')}
        elementType='email'
        inputRef={register}
      />
      <FormInput
        invalid={has(errors, 'delivery')}
        elementType='delivery'
        inputRef={register}
      />

      <Button disabled={!isValid} type='submit' buttonType='Success'>
        ORDER
      </Button>
    </form>
  );

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default withErrorHandler(ContactData, axios);
