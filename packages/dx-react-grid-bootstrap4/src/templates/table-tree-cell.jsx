import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableTreeCellBase = ({
  column, children, tableRow,
  tableColumn, row,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <td
    className={classNames({
      'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
    })}
    ref={refObject}
    {...restProps}
  >
    <div
      className={classNames({
        'd-flex flex-direction-row align-items-center': true,
        'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
        'text-right': tableColumn && tableColumn.align === 'right',
        'text-center': tableColumn && tableColumn.align === 'center',
      })}
    >
      {children}
    </div>
  </td>
);

TableTreeCellBase.propTypes = {
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
