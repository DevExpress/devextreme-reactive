import React from 'react';
import PropTypes from 'prop-types';

import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';

import {
  TableCell,
} from 'material-ui';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableGroupCell', theme => ({
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
}));

const TableGroupCellBase = ({
  style,
  colSpan,
  row,
  column,
  isExpanded,
  toggleGroupExpanded,
  classes,
}) => (
  <TableCell
    colSpan={colSpan}
    style={style}
    className={classes.cell}
    onClick={toggleGroupExpanded}
  >
    <span className={classes.groupIcon}>
      {
        isExpanded
        ? <ExpandMore />
        : <ChevronRight />
      }
    </span>
    <strong className={classes.columnTitle}>
      {column.title || column.name}: {row.value}
    </strong>
  </TableCell>
);

TableGroupCellBase.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  row: PropTypes.shape(),
  column: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

TableGroupCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
};

export const TableGroupCell = withStyles(styleSheet)(TableGroupCellBase);
