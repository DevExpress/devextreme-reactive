import React from 'react';
import PropTypes from 'prop-types';

export const TableRow = ({
  children,
  style,
  tableRow,
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
  tableRow: PropTypes.object,
};

TableRow.defaultProps = {
  children: null,
  style: null,
  tableRow: undefined,
};
