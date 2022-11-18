import * as React from 'react';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import { RIGHT, TOP } from '@devexpress/dx-chart-core';
import classNames from 'clsx';
import PropTypes from 'prop-types';

const PREFIX = 'Overlay';

export const classes = {
  popper: `${PREFIX}-popper`,
};

const StyledPopper = styled(Popper)(() => ({
  [`&.${classes.popper}`]: {
    zIndex: 1,
  },
}));

const popperModifiers = arrowRef => ([
  { name: 'flip', enabled: false },
  { name: 'arrow', enabled: true, options: { element: arrowRef } },
  { name: 'offset', options: { offset: [0, 9] } },
]);

export const Overlay = ({
  className, children, target, rotated, arrowComponent: ArrowComponent, ...restProps
}) => {
  const [arrowRef, setArrowRef] = React.useState(null);
  const placement = rotated ? RIGHT : TOP;

  return (
    <StyledPopper
      open
      anchorEl={target}
      placement={placement}
      className={classNames(classes.popper, className)}
      modifiers={popperModifiers(arrowRef)}
      {...restProps}
    >
      {children}
      <ArrowComponent placement={placement} ref={setArrowRef} />
    </StyledPopper>
  );
};

Overlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  target: PropTypes.any.isRequired,
  rotated: PropTypes.bool.isRequired,
  arrowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

Overlay.defaultProps = {
  className: undefined,
};
