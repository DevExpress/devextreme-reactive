import * as React from 'react';
import * as PropTypes from 'prop-types';
// import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';

export const Modal = ({
  children, open, onClose, containerRef, onBackdropClick, ...restProps
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{ position: 'absolute' }}
      BackdropProps={{ style: { position: 'absolute' } }}
      container={containerRef.current}
      onBackdropClick={onBackdropClick}
      {...restProps}
    >
      {children}
    </Dialog>
  );
};
