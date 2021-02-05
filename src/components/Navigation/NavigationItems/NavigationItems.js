import React from 'react';
import { useSelector } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
  const isAuthenticated = (useSelector((state) => state.auth.token) !== null);

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Sandwich Builder
      </NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link='/logout'>Log Out</NavigationItem>
      ) : (
        <NavigationItem link='/auth'>Log In</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
