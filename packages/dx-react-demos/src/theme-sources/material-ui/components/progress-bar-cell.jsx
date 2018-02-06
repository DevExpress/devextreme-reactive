import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  progressBarCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  progressBar: {
    backgroundColor: theme.palette.primary[300],
    float: 'left',
    height: theme.spacing.unit,
  },
});

export const ProgressBarCellBase = ({ value, classes, style }) => {
  const percent = value * 100;
  return (
    <TableCell
      className={classes.progressBarCell}
      style={style}
    >
      <div
        className={classes.progressBar}
        style={{ width: `${percent}%` }}
        title={`${percent.toFixed(1)}%`}
      />
    </TableCell>
  );
};

ProgressBarCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
};
ProgressBarCellBase.defaultProps = {
  style: {},
};

export const ProgressBarCell = withStyles(styles, { name: 'ProgressBarCell' })(ProgressBarCellBase);
