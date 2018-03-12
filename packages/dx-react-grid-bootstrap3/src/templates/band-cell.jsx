import * as React from 'react';
import * as PropTypes from 'prop-types';

export const BandCell = ({
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
      ...style,
    }}
    {...restProps}
  >
    {children || value}
  </th>
);

BandCell.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

BandCell.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
