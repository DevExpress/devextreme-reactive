import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableFilterCell = ({
  filter, onFilter, children,
  column, tableRow, tableColumn, getMessage,
  filteringEnabled, ...restProps
}) => (
  <th {...restProps}>
    {children || (
      <input
        type="text"
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
        readOnly={!filteringEnabled}
      />
    )}
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
