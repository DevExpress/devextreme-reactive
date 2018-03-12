import * as React from 'react';
import * as PropTypes from 'prop-types';
import './table-tree-cell.css';

export const TableTreeCell = ({
  controls,
  column, value, children,
  tableRow, tableColumn, row,
  ...restProps
}) => (
  <td
    {...restProps}
  >
    <div
      className="d-flex"
    >
      <div
        className="dx-rg-bs4-table-tree-cell-controls"
      >
        {controls}
      </div>
      <div
        className="text-nowrap dx-rg-bs4-table-tree-cell-content"
      >
        {children || value}
      </div>
    </div>
  </td>
);

TableTreeCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  controls: PropTypes.node,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
};

TableTreeCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  controls: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
};
