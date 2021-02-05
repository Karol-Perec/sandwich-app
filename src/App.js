import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import SandwichBuilder from './containters/SandwichBuilder/SandwichBuilder';
import Checkout from './containters/Checkout/Checkout';
import Orders from './containters/Orders/Orders';
import Auth from './containters/Auth/Auth';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path='/auth' component={Auth}/>
          <Route path="/" exact component={SandwichBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
