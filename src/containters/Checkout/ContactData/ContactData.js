import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import orderFormConfig from './OrderFormConfig';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: orderFormConfig,
    isValidForm: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => this.setState({ loading: false }));
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (
      (rules.required && value.trim() === '') ||
      (rules.minLength && value.length < rules.minLength) ||
      (rules.maxLength && value.length > rules.maxLength)
    ) {
      isValid = false;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormEl = { ...updatedOrderForm[inputId] };

    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;

    updatedOrderForm[inputId] = updatedFormEl;

    let isValidForm = true;
    for (let inputId in updatedOrderForm) {
      isValidForm = updatedOrderForm[inputId].valid && isValidForm;
    }

    this.setState({ orderForm: updatedOrderForm, isValidForm: isValidForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            valid={el.config.valid}
            touched={el.config.touched}
            changed={(event) => this.inputChangedHandler(event, el.id)}
          />
        ))}
        <Button
          buttonType='Success'
          onClick={this.orderHandler}
          disabled={!this.state.isValidForm}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
