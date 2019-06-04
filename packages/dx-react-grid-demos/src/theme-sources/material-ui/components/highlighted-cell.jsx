import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

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

const styles = theme => ({
  highlightedCell: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});

const HighlightedCellBase = ({
  tableColumn, value, classes, children, style,
}) => (
  <TableCell
    className={classes.highlightedCell}
    style={{
      color: getColor(value),
      textAlign: tableColumn.align,
      ...style,
    }}
  >
    {children}
  </TableCell>
);

HighlightedCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  children: PropTypes.node,
};
HighlightedCellBase.defaultProps = {
  style: {},
  tableColumn: {},
  children: undefined,
};

export const HighlightedCell = withStyles(styles, { name: 'HighlightedCell' })(HighlightedCellBase);
