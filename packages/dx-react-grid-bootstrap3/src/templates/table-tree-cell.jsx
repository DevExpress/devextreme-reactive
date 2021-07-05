import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableTreeCellBase = ({
  column, value, children,
  tableRow, tableColumn, row,
  style,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <td
    ref={refObject}
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

TableTreeCellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableTreeCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableTreeCell = withKeyboardNavigation()(TableTreeCellBase);
