import React from 'react';
import PropTypes from 'prop-types';

export const TableFilterCell = ({
  style, filter, setFilter, children,
  tableRow, tableColumn, getMessage,
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
        onChange={e => setFilter(e.target.value ? { value: e.target.value } : null)}
      />
    )}
  </th>
);

TableFilterCell.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  getMessage: PropTypes.func,
};

TableFilterCell.defaultProps = {
  style: null,
  filter: null,
  setFilter: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  getMessage: undefined,
};
