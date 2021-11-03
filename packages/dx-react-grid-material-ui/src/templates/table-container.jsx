import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableContainer';
export const classes = {
  root: `${PREFIX}-root`,
};

const StyledDiv = styled('div')(() => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    // NOTE: fix sticky positioning in Safari
    width: '100%',
  },
}));

export const TableContainer = ({
  children,
  className,
  forwardedRef,
  ...restProps
}) => (
  <StyledDiv
    ref={forwardedRef}
    className={classNames(classes.root, className)}
    {...restProps}
  >
    <div>
      {children}
    </div>
  </StyledDiv>
);

TableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableContainer.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};
