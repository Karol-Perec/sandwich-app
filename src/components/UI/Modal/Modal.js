import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, modalClosed, children }) => (
  <>
    <Backdrop show={show} onClick={modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}>
      {children}
    </div>
  </>
);

const isShowUnchanged = (prevProps, nextProps) =>
  prevProps.show === nextProps.show &&
  prevProps.children === nextProps.children;

export default React.memo(Modal, isShowUnchanged);
