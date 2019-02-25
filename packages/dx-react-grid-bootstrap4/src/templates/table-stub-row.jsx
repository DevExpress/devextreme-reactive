import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableStubRow = ({
  children, tableRow,
  ...restProps
}) => (
  <tr
    {...restProps}
  >
    {/* <td colSpan="7" style={{ backgroundColor: 'lightgray'}}> */}
    {children}
    {/* </td> */}
  </tr>
);

TableStubRow.propTypes = {
  children: PropTypes.node,
  tableRow: PropTypes.object,
};

TableStubRow.defaultProps = {
  children: null,
  tableRow: undefined,
};
