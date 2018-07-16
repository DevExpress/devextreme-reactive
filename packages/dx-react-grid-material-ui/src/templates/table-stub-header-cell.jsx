import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    padding: 0,
    position: 'relative',
    borderBottom: 'none',
    '&:before': {
      content: '""',
      position: 'absolute',
      background: theme.palette.divider,
      height: 1,
      bottom: 0,
      right: 0,
      left: 0,
    },
  },
});

const TableStubHeaderCellBase = ({
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

TableStubHeaderCellBase.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableStubHeaderCellBase.defaultProps = {
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const TableStubHeaderCell = withStyles(styles, { name: 'TableStubHeaderCellBase' })(TableStubHeaderCellBase);
