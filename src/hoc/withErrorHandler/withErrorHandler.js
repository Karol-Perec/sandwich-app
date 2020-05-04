import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptior = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptior = axios.interceptors.response.use(
        (res) => res,
        (error) => this.setState({ error: error })
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptior);
      axios.interceptors.response.eject(this.resInterceptiors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error?.message}
          </Modal>
          <WrapperComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
