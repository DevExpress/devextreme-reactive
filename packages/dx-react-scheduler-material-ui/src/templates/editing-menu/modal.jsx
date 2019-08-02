import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  modal: {
    position: 'absolute',
  },
};

const ModalBase = ({
  children, open, onClose, containerRef, onBackdropClick, classes, className, ...restProps
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    className={classNames(classes.modal, className)}
    BackdropProps={{ className: classes.modal }}
    container={containerRef.current}
    onBackdropClick={onBackdropClick}
    {...restProps}
  >
    {children}
  </Dialog>
);

ModalBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  className: PropTypes.string,
};

ModalBase.defaultProps = {
  open: false,
  className: undefined,
};

export const Container = withStyles(styles, { name: 'Container' })(ModalBase);
