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

export const TableNoDataCellBase = ({
  style,
  colSpan,
  getMessage,
  classes,
}) => (
  <TableCell
    style={style}
    className={classes.cell}
    colSpan={colSpan}
  >
    <big className="text-muted">{getMessage('noData')}</big>
  </TableCell>
);

TableNoDataCellBase.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

TableNoDataCellBase.defaultProps = {
  style: null,
  colSpan: 1,
};

export const TableNoDataCell = withStyles(styles, { name: 'TableNoDataCell' })(TableNoDataCellBase);
