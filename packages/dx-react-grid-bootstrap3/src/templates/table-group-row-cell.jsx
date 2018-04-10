import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ExpandButton } from './parts/expand-button';

export const TableGroupCell = ({
  style, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  ...restProps
}) => (
  <td
    colSpan={colSpan}
    style={{
      cursor: 'pointer',
      ...style,
    }}
    onClick={onToggle}
    {...restProps}
  >
    <ExpandButton
      expanded={expanded}
      onToggle={onToggle}
      style={{
        marginRight: '8px',
      }}
    />
    <strong>{column.title || column.name}: </strong>
    {children || row.value}
  </td>
);

TableGroupCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  row: PropTypes.object,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableGroupCell.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  onToggle: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
