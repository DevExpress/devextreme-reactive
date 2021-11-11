import * as React from 'react';
import * as PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

const PREFIX = 'Demo';
const classes = {
  progressBar: `${PREFIX}-progressBar`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.progressBar}`]: {
    backgroundColor: theme.palette.primary.light,
    float: 'left',
    height: theme.spacing(1),
  },
}));

export const ProgressBarCell = ({
  value, style, tabIndex, forwardedRef, className,
}) => {
  const percent = value * 100;
  return (
    <TableCell
      className={className}
      sx={{ pl: 1, pr: 1 }}
      tabIndex={tabIndex}
      ref={forwardedRef}
      style={style}
    >
      <StyledDiv
        className={classes.progressBar}
        style={{ width: `${percent}%` }}
        title={`${percent.toFixed(1)}%`}
      />
    </TableCell>
  );
};

ProgressBarCell.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  forwardedRef: PropTypes.func,
  className: PropTypes.string,
};
ProgressBarCell.defaultProps = {
  style: {},
  tabIndex: undefined,
  forwardedRef: undefined,
  className: undefined,
};
