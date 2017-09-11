import React from 'react';
import PropTypes from 'prop-types';

export const DefaultTableRowTemplate = ({ tableRow, children, ...restProps }) => (
  <tr {...restProps}>{children}</tr>
);

DefaultTableRowTemplate.propTypes = {
  tableRow: PropTypes.object,
  children: PropTypes.node,
};

DefaultTableRowTemplate.defaultProps = {
  tableRow: {},
  children: null,
};
