import React from 'react';

import logoImage from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={logoImage} alt='Sandwiches' />
  </div>
);

export default Logo;
