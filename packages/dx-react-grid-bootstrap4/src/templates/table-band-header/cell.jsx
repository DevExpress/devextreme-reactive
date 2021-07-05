import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const CellBase = ({
  column, children, beforeBorder,
  tableRow, tableColumn, row,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  className, ...restProps
}) => (
  <th
    className={classNames({
      'dx-g-bs4-banded-cell dx-g-bs4-table-cell text-nowrap border-right': true,
      'border-left': beforeBorder,
      'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
    }, className)}
    ref={refObject}
    {...restProps}
  >
    {children}
  </th>
);

CellBase.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

CellBase.defaultProps = {
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  beforeBorder: false,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const Cell = withKeyboardNavigation()(CellBase);
