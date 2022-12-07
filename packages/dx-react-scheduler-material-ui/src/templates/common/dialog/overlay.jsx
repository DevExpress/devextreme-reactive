import * as React from 'react';
import { styled, Dialog } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'Overlay';

export const classes = {
  modal: `${PREFIX}-modal`,
  paper: `${PREFIX}-paper`,
  root: `${PREFIX}-root`,
};

const StyledDialog = styled(Dialog)({
  [`& .${classes.modal}`]: {
    position: 'absolute!important',
  },
  [`& .${classes.paper}`]: {
    zIndex: '1302!important',
  },
  [`&.${classes.root}`]: {
    zIndex: '1301!important',
  },
});

export const Overlay = ({
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

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

Overlay.defaultProps = {
  className: undefined,
  visible: false,
};
