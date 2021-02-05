import React from 'react';

import classes from './FormInput.module.css';

const FormInput = ({ invalid, elementType, inputRef }) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (invalid) {
    inputClasses.push(classes.Invalid);
  }

  switch (elementType) {
    case 'name':
      inputElement = (
        <input
          type='text'
          name='name'
          placeholder='Your name'
          ref={inputRef({
            required: true,
            maxLength: 20,
          })}
          className={inputClasses.join(' ')}
        />
      );
      break;
    case 'street':
      inputElement = (
        <input
          type='text'
          name='street'
          placeholder='Street'
          ref={inputRef({
            required: true,
            maxLength: 20,
          })}
          className={inputClasses.join(' ')}
        />
      );
      break;
    case 'zipCode':
      inputElement = (
        <input
          type='text'
          name='zipCode'
          placeholder='Zip code'
          ref={inputRef({
            required: true,
            pattern: {
              value: /^\d{2}-\d{3}$/i,
              message: 'invalid zip code',
            },
          })}
          className={inputClasses.join(' ')}
        />
      );
      break;
    case 'email':
      inputElement = (
        <input
          type='email'
          name='email'
          placeholder='Your e-mail'
          ref={inputRef({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
          className={inputClasses.join(' ')}
        />
      );
      break;
    case 'delivery':
      inputElement = (
        <select
          name='delivery'
          ref={inputRef({
            required: true,
          })}
          className={inputClasses.join(' ')}>
          <option value='fastest'>Fastest</option>
          <option value='cheapest'>Cheapest</option>
        </select>
      );
      break;
    case 'password':
      inputElement = (
        <input
          type='password'
          name='password'
          placeholder='Password'
          ref={inputRef({
            required: true,
            maxLength: 20,
            minLength: 6,
            pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
          })}
          className={inputClasses.join(' ')}
        />
      );
      break;
    default:
      <input type='text' name='default' ref={inputRef()} />;
  }

  return <div className={classes.Input}>{inputElement}</div>;
};

export default FormInput;
