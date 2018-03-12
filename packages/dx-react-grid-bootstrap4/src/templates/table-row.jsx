import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableRow = ({
  children, row, tableRow, tableColumn,
  ...restProps
}) => (
  <tr
    {...restProps}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  row: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

TableRow.defaultProps = {
  children: null,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
};
