import React from 'react';

import logoImage from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={logoImage} alt="Sandwiches" />
  </div>
);

export default logo;
