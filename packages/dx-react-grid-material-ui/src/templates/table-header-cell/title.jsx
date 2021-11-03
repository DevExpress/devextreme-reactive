import * as React from 'react';
import * as PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';

const PREFIX = 'Title';
export const classes = {
  title: `${PREFIX}-title`,
};
const StyledSpan = styled('span')(() => ({
  [`&.${classes.title}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export const Title = ({
  children, className, ...restProps
}) => (
  <StyledSpan
    className={classNames(classes.title, className)}
    {...restProps}
  >
    {children}
  </StyledSpan>
);

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

Title.defaultProps = {
  className: null,
  children: undefined,
};
