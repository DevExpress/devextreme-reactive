import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableStubRow = React.forwardRef(({
  children, tableRow,
  ...restProps
}, ref) => (
  <tr
    ref={ref}
    {...restProps}
  >
    {children}
  </tr>
));

TableStubRow.propTypes = {
  children: PropTypes.node,
  tableRow: PropTypes.object,
};

TableStubRow.defaultProps = {
  children: null,
  tableRow: undefined,
};
