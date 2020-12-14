import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = () => (
  <div className={classes.Logo}>
    <Link to='/'>
      <img src={logoImage} alt='Sandwiches' />
    </Link>
  </div>
);

export default Logo;
