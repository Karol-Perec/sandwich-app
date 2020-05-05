import React, { Component } from 'react';

import Sandwich from '../../components/Sandwich/Sandwich';
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  ham: 1.3,
  bacon: 0.7,
};

class SandwichBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => this.setState({ error: true }));
  }

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
    const queryParams = [];
    for (let key in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(key) +
          '=' +
          encodeURIComponent(this.state.ingredients[key])
      );
    }
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Karol',
    //     address: {
    //       street: 'KEKW',
    //       zipCode: '21-37',
    //     },
    //     email: 'karol.perec@gmail.com',
    //   },
    //   deliveryMethod: 'dummy',
    // };
    // axios
    //   .post('/orders.json', order)
    //   .then((response) => this.setState({ loading: false, purchasing: false }))
    //   .catch((error) => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let sandwich = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      sandwich = (
        <>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancel}
          purchaseContinued={this.purchaseContinue}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {sandwich}
      </>
    );
  }
}

export default withErrorHandler(SandwichBuilder, axios);
