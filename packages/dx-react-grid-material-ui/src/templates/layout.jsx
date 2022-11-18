import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'Layout';
export const classes = {
  root: `${PREFIX}-root`,
};

const StyledDiv = styled('div')(() => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const Root = ({
  children, className, rootRef, ...restProps
}) => (
  <StyledDiv
    className={classNames(classes.root, className)}
    ref={rootRef}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  rootRef: PropTypes.object,
};

Root.defaultProps = {
  className: undefined,
  rootRef: undefined,
};
