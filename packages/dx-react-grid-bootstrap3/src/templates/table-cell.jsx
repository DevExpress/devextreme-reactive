import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableCellBase = ({
  style, column, value, children,
  tableRow, tableColumn, row,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <td
    ref={refObject}
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

TableCellBase.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableCellBase.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableCell = withKeyboardNavigation()(TableCellBase);
