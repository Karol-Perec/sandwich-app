import React from 'react';

import classes from './DrawerToggle.module.css';

const DrawerToggle = ({onClick}) => (
  <div className={classes.DrawerToggle} onClick={onClick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default DrawerToggle;
