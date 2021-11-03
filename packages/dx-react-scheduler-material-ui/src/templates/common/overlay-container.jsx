import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'OverlayContainer';

export const classes = {
  container: `${PREFIX}-container`,
};

const StyledDiv = styled('div')({
  [`&.${classes.container}`]: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export const OverlayContainerBase = React.forwardRef(({
  children, className, ...restProps
}, ref) => (
  <StyledDiv
    ref={ref}
    className={classNames(classes.container, className)}
    {...restProps}
  >
    {children}
  </StyledDiv>
));

OverlayContainerBase.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

OverlayContainerBase.defaultProps = {
  children: null,
  className: undefined,
};

export const OverlayContainer = (OverlayContainerBase);
