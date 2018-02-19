import * as React from 'react';
import * as PropTypes from 'prop-types';
import './table-container.css';

export const TableContainer = ({ children, ...restProps }) => (
  <div
    className="table-responsive dx-rg-bs4-table-container"
    {...restProps}
  >
    {children}
  </div>
);

TableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
