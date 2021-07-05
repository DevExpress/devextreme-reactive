import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableFilterCellBase = ({
  filter, onFilter, children,
  column, tableRow, tableColumn, getMessage,
  filteringEnabled,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <th
    className={classNames({
      'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
    })}
    ref={refObject}
    {...restProps}
  >
    <div className="input-group">
      {children}
    </div>
  </th>
);

TableFilterCellBase.propTypes = {
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
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
