import React from 'react';
import PropTypes from 'prop-types';

import {
  Checkbox,
  TableCell,
} from 'material-ui';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    overflow: 'visible',
    paddingRight: 0,
    paddingLeft: theme.spacing.unit,
  },
});

export const TableSelectCellBase = ({ style, selected, changeSelected, classes }) => (
  <TableCell
    padding="checkbox"
    style={style}
    className={classes.cell}
    onClick={(e) => {
      e.stopPropagation();
      changeSelected();
    }}
  >
    <Checkbox checked={selected} />
  </TableCell>
);

TableSelectCellBase.defaultProps = {
  style: null,
  selected: false,
  changeSelected: () => {},
};

TableSelectCellBase.propTypes = {
  style: PropTypes.shape(),
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export const TableSelectCell = withStyles(styles, { name: 'TableSelectCell' })(TableSelectCellBase);
