import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('ProgressBarCell', theme => ({
  progressBarCell: {
    padding: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
  progressBar: {
    backgroundColor: theme.palette.primary[300],
    float: 'left',
    height: theme.spacing.unit * 3,
  },
}));

export const ProgressBarCellBase = ({ value, classes }) => (
  <td className={classes.progressBarCell}>
    <div
      className={classes.progressBar}
      style={{ width: `${value}%` }}
      title={`${value.toFixed(1)}%`}
    />
  </td>
);
ProgressBarCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export const ProgressBarCell = withStyles(styleSheet)(ProgressBarCellBase);
