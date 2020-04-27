import React, { Component } from 'react';

import Sandwich from './../../components/Sandwich/Sandwich';

class SandwichBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      ham: 0,
    },
  };

  render() {
    return (
      <>
        <Sandwich ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </>
    );
  }
}

export default SandwichBuilder;
