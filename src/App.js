import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import SandwichBuilder from './containters/SandwichBuilder/SandwichBuilder';
import Checkout from './containters/Checkout/Checkout';
import Orders from './containters/Orders/Orders';
import Auth from './containters/Auth/Auth';
import Logout from './containters/Auth/Logout/Logout';

import * as actions from './store/actions/index';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={SandwichBuilder} />
      <Redirect to='/' />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={SandwichBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
