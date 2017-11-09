import React from 'react';
import PropTypes from 'prop-types';
import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

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
    marginRight: theme.spacing.unit,
    height: theme.spacing.unit * 5,
    width: theme.spacing.unit * 5,
  },
  columnTitle: {
    verticalAlign: 'middle',
  },
});

const TableGroupCellBase = ({
  style,
  colSpan,
  row,
  column,
  isExpanded,
  toggleGroupExpanded,
  classes,
  children,
}) => {
  const handleClick = () => toggleGroupExpanded();

  return (
    <TableCell
      colSpan={colSpan}
      style={style}
      className={classes.cell}
      onClick={handleClick}
    >
      <IconButton
        className={classes.groupButton}
      >
        {
          isExpanded
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
  row: PropTypes.object,
  column: PropTypes.object,
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

TableGroupCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
  children: undefined,
};

export const TableGroupCell = withStyles(styles, { name: 'TableGroupCell' })(TableGroupCellBase);
