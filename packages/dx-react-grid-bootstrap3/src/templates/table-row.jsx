import React from 'react';
import PropTypes from 'prop-types';

export const TableRow = ({
  children, style,
  row, tableRow, tableColumn,
  ...restProps
}) => (
  <tr
    style={style}
    {...restProps}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  row: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

TableRow.defaultProps = {
  children: null,
  style: null,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
};
