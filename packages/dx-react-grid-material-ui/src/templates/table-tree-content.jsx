import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableTreeContent';
export const classes = {
  content: `${PREFIX}-content`,
};

const StyledDiv = styled('div')(() => ({
  [`&.${classes.content}`]: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export const TableTreeContent = ({
  children, className, ...restProps
}) => (
  <StyledDiv
    className={classNames([classes.content], className)}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

TableTreeContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableTreeContent.defaultProps = {
  children: undefined,
  className: undefined,
};
