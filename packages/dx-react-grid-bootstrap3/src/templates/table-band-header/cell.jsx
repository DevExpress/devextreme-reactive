import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Cell = ({
  style, column, value, children,
  tableRow, tableColumn, row,
  ...restProps
}) => (
  <th
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      borderBottom: '1px solid #ddd',
      borderLeft: '1px solid #ddd',
      borderRight: '1px solid #ddd',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </th>
);

Cell.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

Cell.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
