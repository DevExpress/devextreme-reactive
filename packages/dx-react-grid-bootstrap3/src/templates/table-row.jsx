import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableRow = React.forwardRef(({
  children, row, tableRow,
  ...restProps
}, ref) => (
  <tr
    ref={ref}
    {...restProps}
  >
    {children}
  </tr>
));

TableRow.propTypes = {
  children: PropTypes.node,
  row: PropTypes.any,
  tableRow: PropTypes.object,
};

TableRow.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
};
