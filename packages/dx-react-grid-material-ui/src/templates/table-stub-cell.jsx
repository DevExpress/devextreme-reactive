import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from './utils';

const styles = theme => ({
  cell: {
    padding: 0,
  },
  footer: {
    borderBottom: getBorderColor(theme),
  },
});

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
    classes={{ footer: classes.footer }}
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
