import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell as TableCellMUI } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3,
    },
  },
  cellRightAlign: {
    textAlign: 'right',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  controls: {
    flex: 'auto 0 0',
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const CellBase = ({
  controls,
  column, value, children, classes,
  tableRow, tableColumn, row,
  className,
  ...restProps
}) => (
  <TableCellMUI
    className={classNames({
      [classes.cell]: true,
      [classes.cellRightAlign]: tableColumn && tableColumn.align === 'right',
    }, className)}
    {...restProps}
  >
    <div className={classes.container}>
      <div className={classes.controls}>
        {controls}
      </div>
      <div className={classes.content}>
        {children || value}
      </div>
    </div>
  </TableCellMUI>
);

CellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  classes: PropTypes.object.isRequired,
  controls: PropTypes.node,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  controls: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const Cell = withStyles(styles)(CellBase);
