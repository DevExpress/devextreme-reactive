import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'Container';

export const classes = {
  container: `${PREFIX}-container`,
};

const StyledDiv = styled('div')(() => ({
  [`&.${classes.container}`]: {
    WebkitOverflowScrolling: 'touch',
    // NOTE: fix sticky positioning in Safari
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const ContainerBase = ({
  children, className, ...restProps
}) => (
  <StyledDiv className={classNames(classes.container, className)} {...restProps}>
    {children}
  </StyledDiv>
);

ContainerBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
};
