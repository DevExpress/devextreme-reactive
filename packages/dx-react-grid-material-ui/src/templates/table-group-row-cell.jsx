import React from 'react';
import PropTypes from 'prop-types';

import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';

import {
    TableCell,
} from 'material-ui';


export const TableGroupRowCell = ({ style, colspan, row, isExpanded, toggleGroupExpanded }) => (
  <TableCell
    colSpan={colspan}
    style={{
      cursor: 'pointer',
      paddingLeft: 24,
      ...style,
    }}
    onClick={toggleGroupExpanded}
  >
    <span
      style={{
        verticalAlign: 'middle',
        display: 'inline-block',
        marginRight: 6,
        marginLeft: -6,
        height: 24,
      }}
    >
      {
        isExpanded
        ? <ExpandMore />
        : <ChevronRight />
      }
    </span>
    <strong style={{ verticalAlign: 'middle' }}>
      {row.column.title}: {row.value}
    </strong>
  </TableCell>
);

TableGroupRowCell.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
  row: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
};

TableGroupRowCell.defaultProps = {
  style: null,
  colspan: 1,
  row: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
};

export const TableGroupIndentCell = () => (
  <TableCell
    style={{
      width: 24,
      padding: 0,
    }}
  >
    &nbsp;
  </TableCell>
);
