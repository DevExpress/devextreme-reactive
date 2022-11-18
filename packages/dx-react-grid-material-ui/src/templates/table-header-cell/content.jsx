import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';

const PREFIX = 'Content';
export const classes = {
  content: `${PREFIX}-content`,
  alignCenter: `${PREFIX}-alignCenter`,
  alignRight: `${PREFIX}-alignRight`,
};
const StyledDiv = styled('div')(() => ({
  [`&.${classes.content}`]: {
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  [`&.${classes.alignCenter}`]: {
    justifyContent: 'center',
  },
  [`&.${classes.alignRight}`]: {
    justifyContent: 'flex-end',
  },
}));

export const Content = ({
  column, align, children, className, ...restProps
}) => (
  <StyledDiv
    className={classNames({
      [classes.content]: true,
      [classes.alignCenter]: align === 'center',
      [classes.alignRight]: align === 'right',
    }, className)}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

Content.propTypes = {
  column: PropTypes.object,
  align: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

Content.defaultProps = {
  column: undefined,
  align: 'left',
  className: null,
  children: undefined,
};
