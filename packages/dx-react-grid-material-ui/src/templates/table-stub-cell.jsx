import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = {
  cell: {
    padding: 0,
  },
};

const TableStubCellBase = ({ style, classes }) => (
  <TableCell
    style={style}
    className={classes.cell}
  />
);

TableStubCellBase.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

TableStubCellBase.defaultProps = {
  style: {},
};

export const TableStubCell = withStyles(styles, { name: 'TableStubCell' })(TableStubCellBase);
