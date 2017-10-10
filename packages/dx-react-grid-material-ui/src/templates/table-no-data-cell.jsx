import React from 'react';
import PropTypes from 'prop-types';

import {
  TableCell,
} from 'material-ui';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    textAlign: 'center',
    padding: `${theme.spacing.unit * 5}px 0`,
  },
});

export const TableNoDataCellBase = ({ style, colSpan, noData, classes }) => (
  <TableCell
    style={style}
    className={classes.cell}
    colSpan={colSpan}
  >
    <big className="text-muted">{noData}</big>
  </TableCell>
);

TableNoDataCellBase.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  noData: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

TableNoDataCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  noData: 'No data',
};

export const TableNoDataCell = withStyles(styles, { name: 'TableNoDataCell' })(TableNoDataCellBase);
