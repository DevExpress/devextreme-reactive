import React from 'react';
import PropTypes from 'prop-types';

export const TableRow = ({ tableRow, children, ...restProps }) => (
  <tr {...restProps}>{children}</tr>
);

TableRow.propTypes = {
  tableRow: PropTypes.object,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  tableRow: {},
  children: null,
};
