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

export const FlexibleSpaceBase = ({
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

FlexibleSpaceBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

FlexibleSpaceBase.defaultProps = {
  children: null,
  className: undefined,
};

export const FlexibleSpace = (FlexibleSpaceBase);
