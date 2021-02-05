import React, { useState } from 'react';

import Footer from '../../components/Navigation/Footer/Footer';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css';

const Layout = ({ children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const handleSideDrawerClose = () => {
    setShowSideDrawer(false);
  };

  const handleSideDrawerOpen = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <>
      <Toolbar onDrawerToggleClick={handleSideDrawerOpen} />
      <SideDrawer
        onBackdropClick={handleSideDrawerClose}
        show={showSideDrawer}
      />
      <main className={classes.Content}>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
