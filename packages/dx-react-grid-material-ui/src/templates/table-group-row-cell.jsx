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
}));

const TableGroupCellBase = ({
  style,
  colspan,
  row,
  isExpanded,
  toggleGroupExpanded,
  classes,
}) => (
  <TableCell
    colSpan={colspan}
    style={style}
    className={classes.cell}
    onClick={toggleGroupExpanded}
  >
    <span
      style={{
        verticalAlign: 'middle',
        display: 'inline-block',
        marginRight: '6px',
        marginLeft: '-6px',
        height: '24px',
      }}
    >
      {
        isExpanded
        ? <ExpandMore />
        : <ChevronRight />
      }
    </span>
    <strong style={{ verticalAlign: 'middle' }}>
      {row.column.title || row.column.name}: {row.value}
    </strong>
  </TableCell>
);

TableGroupCellBase.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
  row: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

TableGroupCellBase.defaultProps = {
  style: null,
  colspan: 1,
  row: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
};

export const TableGroupCell = withStyles(styleSheet)(TableGroupCellBase);
