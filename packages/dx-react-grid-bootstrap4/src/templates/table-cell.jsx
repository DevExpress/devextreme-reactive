import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableCell = ({
  column, value, children,
  tableRow, tableColumn, row,
  forwardedRef,
  className, ...restProps
}) => (
  <td
    className={classNames({
      'dx-g-bs4-table-cell': true,
      'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
      'text-right': tableColumn && tableColumn.align === 'right',
      'text-center': tableColumn && tableColumn.align === 'center',
    }, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children || value}
  </td>
);

TableCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.object,
};

TableCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  forwardedRef: undefined,
};
