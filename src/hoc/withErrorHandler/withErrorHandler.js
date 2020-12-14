import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const respInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => setError(error)
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.request.eject(respInterceptor);
      };
    });

    const handleErrorConfirm = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} onBackdropClick={handleErrorConfirm}>
          {error?.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
