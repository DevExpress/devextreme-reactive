import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableTreeCell = ({
  column, children, tableRow, tableColumn, row, ...restProps
}) => (
  <td
    {...restProps}
  >
    <div
      className="d-flex flex-direction-row align-items-center"
    >
      {children}
    </div>
  </td>
);

TableTreeCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.object,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
};

TableTreeCell.defaultProps = {
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
};
