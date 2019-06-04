import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

const styles = (theme) => {
  const arrowSize = theme.spacing(1.2);
  return {
    popper: {
      zIndex: 1,
      marginBottom: `${arrowSize}px`,
    },
    paper: {
      padding: theme.spacing(0.5, 1),
    },
    arrow: {
      width: `${arrowSize * 5}px`,
      height: `${arrowSize * 2.5}px`,
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      overflow: 'hidden',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: `${arrowSize}px`,
        height: `${arrowSize}px`,
        background: theme.palette.background.paper,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        top: 0,
        left: '50%',
        boxShadow: theme.shadows[2],
      },
    },
  };
};

const popperModifiers = {
  flip: { enabled: false },
};

export const Overlay = withStyles(styles)(({
  classes, className, children, target, ...restProps
}) => (
  <Popper
    open
    anchorEl={target}
    placement="top"
    className={classNames(classes.popper, className)}
    modifiers={popperModifiers}
    {...restProps}
  >
    <Paper className={classes.paper}>
      {children}
    </Paper>
    <div className={classes.arrow} />
  </Popper>
));
