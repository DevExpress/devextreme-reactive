import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableStubCell', () => ({
  cell: {
    padding: 0,
  },
}));

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

export const TableStubCell = withStyles(styleSheet)(TableStubCellBase);
