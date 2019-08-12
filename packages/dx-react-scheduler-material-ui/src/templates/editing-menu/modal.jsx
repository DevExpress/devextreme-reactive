import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  modal: {
    position: 'absolute!important',
  },
};

const ModalBase = ({
  children, isOpen, handleClose, containerRef, classes, className, ...restProps
}) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    className={classNames(classes.modal, className)}
    BackdropProps={{ className: classes.modal }}
    container={containerRef.current}
    onBackdropClick={handleClose}
    {...restProps}
  >
    {children}
  </Dialog>
);

ModalBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
};

ModalBase.defaultProps = {
  className: undefined,
  isOpen: false,
};

export const Modal = withStyles(styles, { name: 'Modal' })(ModalBase);
