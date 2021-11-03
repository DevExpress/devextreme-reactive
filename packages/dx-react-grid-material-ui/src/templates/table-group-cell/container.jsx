import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';
import { getStickyCellStyle } from '../utils';

const PREFIX = 'Container';
export const classes = {
  wrapper: `${PREFIX}-wrapper`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.wrapper}`]: {
    ...getStickyCellStyle(theme),
    float: 'left',
    maxWidth: '100%',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export const Container = ({
  children, style, className, side, position, ...restProps
}) => (
  <StyledDiv
    className={classNames(classes.wrapper, className)}
    style={{ ...style, [side]: position }}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  side: PropTypes.string,
  position: PropTypes.string,
};

Container.defaultProps = {
  children: undefined,
  className: undefined,
  style: null,
  side: 'left',
  position: '',
};
