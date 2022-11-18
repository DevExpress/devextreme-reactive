import * as React from 'react';
import PropTypes from 'prop-types';

export const TableTreeCell = ({
  column, value, children,
  tableRow, tableColumn, row,
  style,
  forwardedRef,
  ...restProps
}) => (
  <td
    ref={forwardedRef}
    style={{
      textAlign: (tableColumn && tableColumn.align) || 'left',
      whiteSpace: (tableColumn && tableColumn.wordWrapEnabled) ? 'normal' : 'nowrap',
      ...style,
    }}
    {...restProps}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  </td>
);

TableTreeCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
  forwardedRef: PropTypes.func,
};

TableTreeCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
  forwardedRef: undefined,
};
