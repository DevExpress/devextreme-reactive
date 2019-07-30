import * as React from 'react';
import * as PropTypes from 'prop-types';
// import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';

export const Modal = ({
  children, open, onClose, container, onBackdropClick, ...restProps
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{ position: 'absolute' }}
      BackdropProps={{ style: { position: 'absolute' } }}
      container={container.current}
      onBackdropClick={onBackdropClick}
      {...restProps}
    >
      {children}
    </Dialog>
  );
};
