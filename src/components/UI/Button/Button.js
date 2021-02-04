import React from 'react';

import classes from './Button.module.css';

const Button = ({ onClick, type, buttonType, children }) => (
  <button
    className={[classes.Button, classes[buttonType]].join(' ')}
    onClick={onClick}
    type={type}>
    {children}
  </button>
);

export default Button;
