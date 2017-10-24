import React from 'react';
import PropTypes from 'prop-types';
import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const ENTER_KEY_CODE = 13;

const styles = theme => ({
  cell: {
    cursor: 'pointer',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
  },
  indentCell: {
    padding: 0,
  },
  groupIcon: {
    verticalAlign: 'middle',
    display: 'inline-block',
    marginRight: '6px',
    height: theme.spacing.unit * 3,
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
  const handleKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) toggleGroupExpanded();
  };

  return (
    <TableCell
      colSpan={colSpan}
      style={style}
      className={classes.cell}
      tabIndex={0}
      onClick={toggleGroupExpanded}
      onKeyDown={handleKeyDown}
    >
      <span className={classes.groupIcon}>
        {
          isExpanded
            ? <ExpandMore />
            : <ChevronRight />
        }
      </span>
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
