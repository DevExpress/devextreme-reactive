import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Dialog from '@mui/material/Dialog';
import withStyles from '@mui/styles/withStyles';

const styles = {
  modal: {
    position: 'absolute!important',
  },
  paper: {
    zIndex: '1302!important',
  },
  root: {
    zIndex: '1301!important',
  },
};

const OverlayBase = ({
  children, visible, onHide, target, classes, className, ...restProps
}) => (
  <Dialog
    open={visible}
    onClose={onHide}
    className={classNames(classes.modal, classes.root, className)}
    BackdropProps={{ className: classes.modal }}
    PaperProps={{ className: classes.paper }}
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
