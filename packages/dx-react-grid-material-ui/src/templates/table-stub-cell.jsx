import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = {
  cell: {
    padding: 0,
  },
};

const TableStubCellBase = ({
  style,
  classes,
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <TableCell
    style={style}
    className={classNames(classes.cell, className)}
    {...restProps}
  />
);

TableStubCellBase.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableStubCellBase.defaultProps = {
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const TableStubCell = withStyles(styles, { name: 'TableStubCell' })(TableStubCellBase);
