import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableFilterCell = ({
  filter, onFilter, children,
  column, tableRow, tableColumn, getMessage,
  filteringEnabled, ...restProps
}) => (
  <th {...restProps}>
    <div className="input-group">
      {children}
    </div>
  </th>
);

TableFilterCell.propTypes = {
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
};

TableFilterCell.defaultProps = {
  filter: null,
  onFilter: () => {},
  children: undefined,
  column: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  getMessage: undefined,
  filteringEnabled: true,
};
