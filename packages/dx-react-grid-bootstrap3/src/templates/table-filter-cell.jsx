import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableFilterCell = ({
  style, filter, onFilter, children,
  column, tableRow, tableColumn, getMessage,
  ...restProps
}) => (
  <th
    style={{
      fontWeight: 'normal',
      ...style,
    }}
    {...restProps}
  >
    {children || (
      <input
        type="text"
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      />
    )}
  </th>
);

TableFilterCell.propTypes = {
  style: PropTypes.object,
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
};
