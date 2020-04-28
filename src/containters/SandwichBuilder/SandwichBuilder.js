import React, { Component } from 'react';

import Sandwich from '../../components/Sandwich/Sandwich';
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  ham: 1.3,
  bacon: 0.7,
};

class SandwichBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      ham: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  updatePurchaseState(ingredients) {
    const ingredientsSum = Object.values(ingredients).reduce(
      (sum, el) => sum + el,
      0
    );
    this.setState({ purchaseable: ingredientsSum > 0 });
  }

  addIngredient = (type) => {
    const updatedIgredients = {
      ...this.state.ingredients,
    };
    updatedIgredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIgredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIgredients);
  };

  removeIngredient = (type) => {
    const updatedIgredients = {
      ...this.state.ingredients,
    };
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    updatedIgredients[type] = oldCount - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIgredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIgredients);
  };

  purchase = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    alert('Purchased');
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancel}
            purchaseContinued={this.purchaseContinue}
          />
        </Modal>
        <Sandwich ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredient}
          ingredientRemoved={this.removeIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchase}
        />
      </>
    );
  }
}

export default SandwichBuilder;
