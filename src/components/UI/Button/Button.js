import React from 'react';

import classes from './Button.module.css';

const Button = ({ onClick, type, buttonType, children, disabled }) => (
  <button
    className={[classes.Button, classes[buttonType]].join(' ')}
    onClick={onClick}
    type={type}
    disabled={disabled}>
    {children}
  </button>
);

export default Button;
