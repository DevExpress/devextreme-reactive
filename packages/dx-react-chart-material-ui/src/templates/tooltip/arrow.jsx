import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = (theme) => {
  const arrowSize = theme.spacing(1.2);
  return {
    'arrow-top': {
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
    'arrow-right': {
      width: `${arrowSize * 2.5}px`,
      height: `${arrowSize * 5}px`,
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateX(-100%) translateY(-50%)',
      overflow: 'hidden',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: `${arrowSize}px`,
        height: `${arrowSize}px`,
        background: theme.palette.background.paper,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        top: '50%',
        left: '100%',
        boxShadow: theme.shadows[2],
      },
    },
  };
};

export const Arrow = withStyles(styles)(({
  classes, className, placement, ...restProps
}) => (
  <div className={classNames(classes[`arrow-${placement}`], className)} {...restProps} />
));
