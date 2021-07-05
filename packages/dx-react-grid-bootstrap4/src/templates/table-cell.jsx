import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableCellBase = ({
  column, value, children,
  tableRow, tableColumn, row,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  className, ...restProps
}) => (
  <td
    className={classNames({
      'dx-g-bs4-table-cell': true,
      'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
      'text-right': tableColumn && tableColumn.align === 'right',
      'text-center': tableColumn && tableColumn.align === 'center',
      'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
    }, className)}
    ref={refObject}
    {...restProps}
  >
    {children || value}
  </td>
);

TableCellBase.propTypes = {
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
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableCell = withKeyboardNavigation()(TableCellBase);
