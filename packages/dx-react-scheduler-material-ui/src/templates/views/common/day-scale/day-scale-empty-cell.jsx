import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'DayScaleEmptyCell';

export const classes = {
  emptyCell: `${PREFIX}-emptyCell`,
};

const StyledDiv = styled('div')({
  [`&.${classes.emptyCell}`]: {
    height: '100%',
    width: '100%',
  },
});

export const DayScaleEmptyCellBase = ({
  className,
  children,
  ...restProps
}) => (
  <StyledDiv {...restProps} className={classNames(classes.emptyCell, className)}>
    {children}
  </StyledDiv>
);

DayScaleEmptyCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

DayScaleEmptyCellBase.defaultProps = {
  className: undefined,
  children: undefined,
};

export const DayScaleEmptyCell = (DayScaleEmptyCellBase);
