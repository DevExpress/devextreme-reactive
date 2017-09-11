import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui';

export const DefaultTableRowTemplate = ({ tableRow, children, ...restProps }) => (
  <TableRow {...restProps}>{children}</TableRow>
);

DefaultTableRowTemplate.propTypes = {
  tableRow: PropTypes.object,
  children: PropTypes.node,
};

DefaultTableRowTemplate.defaultProps = {
  tableRow: {},
  children: null,
};
