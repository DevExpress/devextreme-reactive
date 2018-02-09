import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableContainer = ({ children, style, ...restProps }) => (
  <div
    className="table-responsive"
    style={{
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      ...style,
    }}
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
  style: PropTypes.object,
};

TableContainer.defaultProps = {
  style: null,
};
