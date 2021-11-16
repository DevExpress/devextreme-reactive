import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'FlexibleSpace';

export const classes = {
  flexibleSpace: `${PREFIX}-flexibleSpace`,
};

const StyledDiv = styled('div')({
  [`&.${classes.flexibleSpace}`]: {
    flex: '0 0 0',
    marginLeft: 'auto',
  },
});

export const FlexibleSpace = ({
  children,
  className,
  ...restProps
}) => (
  <StyledDiv
    className={classNames(classes.flexibleSpace, className)}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

FlexibleSpace.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

FlexibleSpace.defaultProps = {
  children: null,
  className: undefined,
};
