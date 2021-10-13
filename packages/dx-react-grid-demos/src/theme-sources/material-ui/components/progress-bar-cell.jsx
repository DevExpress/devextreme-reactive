import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progressBarCell: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  progressBar: {
    backgroundColor: theme.palette.primary.light,
    float: 'left',
    height: theme.spacing(1),
  },
});

const ProgressBarCellBase = ({
  value, classes, style, tabIndex, forwardedRef, className,
}) => {
  const percent = value * 100;
  return (
    <TableCell
      className={classNames({
        [classes.progressBarCell]: true,
      }, className)}
      tabIndex={tabIndex}
      ref={forwardedRef}
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
  tabIndex: PropTypes.number,
  forwardedRef: PropTypes.object,
  className: PropTypes.string,
};
ProgressBarCellBase.defaultProps = {
  style: {},
  tabIndex: undefined,
  forwardedRef: undefined,
  className: undefined,
};

export const ProgressBarCell = withStyles(styles, { name: 'ProgressBarCell' })(ProgressBarCellBase);
