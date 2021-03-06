import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { has } from 'lodash';

import FormInput from '../../components/UI/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const building = useSelector((state) => state.sandwichBuilder.building);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    errors,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    dispatch(actions.authenticate(data.email, data.password, isSignup));
  };

  const handleSwitchAuthMode = () => {
    setIsSignup((prevState) => !prevState);
  };

  let form = loading ? (
    <Spinner />
  ) : (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          invalid={has(errors, 'email')}
          elementType='email'
          inputRef={register}
        />
        <FormInput
          invalid={has(errors, 'password')}
          elementType='password'
          inputRef={register}
        />

        <Button disabled={!isValid} type='submit' buttonType='Success'>
          {isSignup ? 'SIGN UP' : 'LOG IN'}
        </Button>
      </form>
    </div>
  );

  let errorMessage = error ? <p>{error.message}</p> : null;
  let authRedirect = null;
  if (isAuthenticated) {
    if (building) {
      authRedirect = <Redirect to='/checkout' />;
    } else {
      authRedirect = <Redirect to='/' />;
    }
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {form}
      {isSignup ? <p>Already have account?</p> : <p>Don't have account?</p>}
      <Button onClick={handleSwitchAuthMode} buttonType='Danger'>
        SWITCH TO {isSignup ? 'LOG IN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

export default Auth;
