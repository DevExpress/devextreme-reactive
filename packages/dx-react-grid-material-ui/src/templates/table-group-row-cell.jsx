import React from 'react';
import PropTypes from 'prop-types';

import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';

import {
    TableCell,
} from 'material-ui';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableGroupRowCell', theme => ({
  cell: {
    cursor: 'pointer',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  indentCell: {
    padding: 0,
  },
}));

const TableGroupRowCellBase = ({
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

TableGroupRowCellBase.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
  row: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

TableGroupRowCellBase.defaultProps = {
  style: null,
  colspan: 1,
  row: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
};

export const TableGroupRowCell = withStyles(styleSheet)(TableGroupRowCellBase);

const TableGroupIndentCellBase = ({ column, style, classes }) => (
  <TableCell
    style={{
      width: column.width,
      ...style,
    }}
    className={classes.indentCell}
  >
    &nbsp;
  </TableCell>
);

TableGroupIndentCellBase.propTypes = {
  style: PropTypes.object,
  column: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

TableGroupIndentCellBase.defaultProps = {
  style: {},
};

export const TableGroupIndentCell = withStyles(styleSheet)(TableGroupIndentCellBase);

