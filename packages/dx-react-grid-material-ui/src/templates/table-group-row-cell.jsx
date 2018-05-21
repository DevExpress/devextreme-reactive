import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    cursor: 'pointer',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: (theme.spacing.unit / 2) - 1,
  },
  indentCell: {
    padding: 0,
  },
  groupButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    height: theme.spacing.unit * 5,
    width: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit,
  },
  columnTitle: {
    verticalAlign: 'middle',
  },
});

const TableGroupCellBase = ({
  style, colSpan, row,
  column, expanded,
  onToggle,
  classes, children,
  className, tableRow,
  tableColumn, ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <TableCell
      colSpan={colSpan}
      style={style}
      className={classNames(classes.cell, className)}
      onClick={handleClick}
      {...restProps}
    >
      <IconButton
        className={classes.groupButton}
      >
        {
          expanded
            ? <ExpandMore />
            : <ChevronRight />
        }
      </IconButton>
      <span className={classes.columnTitle}>
        <strong>{column.title || column.name}: </strong>
        {children || row.value}
      </span>
    </TableCell>
  );
};

TableGroupCellBase.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  row: PropTypes.any,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableGroupCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  onToggle: () => {},
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const TableGroupCell = withStyles(styles, { name: 'TableGroupCell' })(TableGroupCellBase);
