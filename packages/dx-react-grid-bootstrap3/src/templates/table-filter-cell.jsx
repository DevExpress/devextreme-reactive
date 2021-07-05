import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableFilterCellBase = ({
  style, filter, onFilter, children,
  column, tableRow, tableColumn, getMessage, filteringEnabled,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <th
    ref={refObject}
    style={{
      fontWeight: 'normal',
      ...style,
    }}
    {...restProps}
  >
    <div
      className="input-group"
      style={{ width: '100%' }}
    >
      {children}
    </div>
  </th>
);

TableFilterCellBase.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  children: PropTypes.node,
  column: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  getMessage: PropTypes.func,
  filteringEnabled: PropTypes.bool,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableFilterCellBase.defaultProps = {
  style: null,
  filter: null,
  onFilter: () => {},
  children: undefined,
  column: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  getMessage: undefined,
  filteringEnabled: true,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableFilterCell = withKeyboardNavigation()(TableFilterCellBase);
