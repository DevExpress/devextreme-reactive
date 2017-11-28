import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    textAlign: 'center',
  },
  checkbox: {
    marginTop: '-1px',
    marginBottom: '-1px',
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
  },
});

export const TableSelectCellBase = ({
  style, selected, changeSelected, classes,
  className, row, tableRow, tableColumn,
  ...restProps
}) => (
  <TableCell
    padding="checkbox"
    style={style}
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <Checkbox
      className={classes.checkbox}
      checked={selected}
      onClick={(e) => {
        e.stopPropagation();
        changeSelected();
      }}
    />
  </TableCell>
);

TableSelectCellBase.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
  classes: PropTypes.object.isRequired,
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

TableSelectCellBase.defaultProps = {
  style: null,
  selected: false,
  changeSelected: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const TableSelectCell = withStyles(styles, { name: 'TableSelectCell' })(TableSelectCellBase);
