import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './table-cell.css';

export const TableCell = ({
  column, value, children,
  tableRow, tableColumn, row,
  ...restProps
}) => (
  <td
    className={classNames({
      'text-nowrap table-cell': true,
      'text-right': tableColumn.align === 'right',
    })}
    {...restProps}
  >
    {children || value}
  </td>
);

TableCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
