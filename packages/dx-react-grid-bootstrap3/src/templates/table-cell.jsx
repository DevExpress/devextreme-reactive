import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableCell = ({
  style, column, value, children,
  tableRow, tableColumn, row,
  forwardedRef,
  ...restProps
}) => (
  <td
    ref={forwardedRef}
    style={{
      whiteSpace: (tableColumn && tableColumn.wordWrapEnabled) ? 'normal' : 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: (tableColumn && tableColumn.align) || 'left',
      ...style,
    }}
    {...restProps}
  >
    {children || value}
  </td>
);

TableCell.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  forwardedRef: PropTypes.func,
};

TableCell.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  forwardedRef: undefined,
};
