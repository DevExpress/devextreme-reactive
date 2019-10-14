import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  modal: {
    position: 'absolute!important',
  },
};

const OverlayBase = ({
  children, visible, onHide, target, classes, className, ...restProps
}) => (
  <Dialog
    open={visible}
    onClose={onHide}
    className={classNames(classes.modal, className)}
    BackdropProps={{ className: classes.modal }}
    container={target.current}
    onBackdropClick={onHide}
    {...restProps}
  >
    {children}
  </Dialog>
);

OverlayBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

OverlayBase.defaultProps = {
  className: undefined,
  visible: false,
};

export const Overlay = withStyles(styles, { name: 'Overlay' })(OverlayBase);
