import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableFilterCell = ({
  style, filter, onFilter, children,
  column, tableRow, tableColumn, getMessage, filteringEnabled,
  forwardedRef,
  ...restProps
}) => (
  <th
    ref={forwardedRef}
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

TableFilterCell.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  children: PropTypes.node,
  column: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  getMessage: PropTypes.func,
  filteringEnabled: PropTypes.bool,
  forwardedRef: PropTypes.object,
};

TableFilterCell.defaultProps = {
  style: null,
  filter: null,
  onFilter: () => {},
  children: undefined,
  column: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  getMessage: undefined,
  filteringEnabled: true,
  forwardedRef: undefined,
};
