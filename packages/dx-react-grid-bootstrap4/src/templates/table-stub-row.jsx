import * as React from 'react';
import PropTypes from 'prop-types';

export const TableStubRow = ({
  children, tableRow, forwardedRef,
  ...restProps
}) => (
  <tr
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </tr>
);

TableStubRow.propTypes = {
  children: PropTypes.node,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableStubRow.defaultProps = {
  children: null,
  tableRow: undefined,
  forwardedRef: undefined,
};
