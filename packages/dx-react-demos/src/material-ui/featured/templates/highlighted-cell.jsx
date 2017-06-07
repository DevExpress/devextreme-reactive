import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const getColor = (amount) => {
  if (amount < 3000) {
    return '#F44336';
  }
  if (amount < 5000) {
    return '#FFC107';
  }
  if (amount < 8000) {
    return '#FF5722';
  }
  return '#009688';
};

const styleSheet = createStyleSheet('HighlightedCell', theme => ({
  highlightedCell: {
    padding: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
}));

const HighlightedCellBase = ({ align, value, classes }) => (
  <td
    className={classes.highlightedCell}
    style={{
      color: getColor(value),
      textAlign: align,
    }}
  >
    ${value}
  </td>
);

HighlightedCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  align: PropTypes.string.isRequired,
};

export const HighlightedCell = withStyles(styleSheet)(HighlightedCellBase);
