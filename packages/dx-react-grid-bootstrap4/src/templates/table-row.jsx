import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableRow = ({
  children, row, tableRow, forwardedRef,
  ...restProps
}) => (
  <tr
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableRow.defaultProps = {
  children: null,
  row: undefined,
  tableRow: undefined,
  forwardedRef: undefined,
};
