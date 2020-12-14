import React from 'react';

import classes from './Button.module.css';

const Button = ({ onClick, disabled, buttonType, children }) => (
  <button
    className={[classes.Button, classes[buttonType]].join(' ')}
    onClick={onClick}
    disabled={disabled}>
    {children}
  </button>
);

export default Button;
