import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Dialog from '@mui/material/Dialog';

const PREFIX = 'Overlay';

export const classes = {
  modal: `${PREFIX}-modal`,
  paper: `${PREFIX}-paper`,
  root: `${PREFIX}-root`,
};

const StyledDialog = styled(Dialog)({
  [`&.${classes.modal}`]: {
    position: 'absolute!important',
  },
  [`& .${classes.paper}`]: {
    zIndex: '1302!important',
  },
  [`&.${classes.root}`]: {
    zIndex: '1301!important',
  },
});

const OverlayBase = ({
  children, visible, onHide, target, className, ...restProps
}) => (
  <StyledDialog
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
  </StyledDialog>
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

export const Overlay = (OverlayBase);
