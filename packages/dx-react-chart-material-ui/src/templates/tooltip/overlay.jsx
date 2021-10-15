import * as React from 'react';
import withStyles from '@mui/styles/withStyles';
import Popper from '@mui/material/Popper';
import { RIGHT, TOP } from '@devexpress/dx-chart-core';
import classNames from 'clsx';
import * as PropTypes from 'prop-types';

const styles = () => ({
  popper: {
    zIndex: 1,
  },
});

const popperModifiers = arrowRef => ([
  { name: 'flip', enabled: false },
  { name: 'arrow', enabled: true, options: { element: arrowRef } },
  { name: 'offset', options: { offset: [0, 9] } },
]);

const OverlayBase = ({
  classes, className, children, target, rotated, arrowComponent: ArrowComponent, ...restProps
}) => {
  const [arrowRef, setArrowRef] = React.useState(null);
  const placement = rotated ? RIGHT : TOP;

  return (
    <Popper
      open
      anchorEl={target}
      placement={placement}
      className={classNames(classes.popper, className)}
      modifiers={popperModifiers(arrowRef)}
      {...restProps}
    >
      {children}
      <ArrowComponent placement={placement} ref={setArrowRef} />
    </Popper>
  );
};

OverlayBase.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  target: PropTypes.any.isRequired,
  rotated: PropTypes.bool.isRequired,
  arrowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

OverlayBase.defaultProps = {
  className: undefined,
};

export const Overlay = withStyles(styles)(OverlayBase);
