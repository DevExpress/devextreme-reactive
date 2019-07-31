import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import { RIGHT, TOP } from '@devexpress/dx-chart-core';
import classNames from 'classnames';

const styles = (theme) => {
  const arrowSize = theme.spacing(1.2);
  return {
    'popper-top': {
      zIndex: 1,
      marginBottom: `${arrowSize}px`,
    },
    'popper-right': {
      zIndex: 1,
      marginLeft: `${arrowSize}px`,
    },
  };
};

const popperModifiers = {
  flip: { enabled: false },
};

export const Overlay = withStyles(styles)(({
  classes, className, children, target, rotated, arrowComponent: ArrowComponent, ...restProps
}) => {
  const placement = rotated ? RIGHT : TOP;
  return (
    <Popper
      open
      anchorEl={target}
      placement={placement}
      className={classNames(classes[`popper-${placement}`], className)}
      modifiers={popperModifiers}
      {...restProps}
    >
      {children}
      <ArrowComponent placement={placement} />
    </Popper>
  );
});
