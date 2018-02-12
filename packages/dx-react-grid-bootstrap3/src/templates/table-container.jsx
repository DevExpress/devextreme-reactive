import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableContainer = ({ children, style, ...restProps }) => (
  <div
    className="table-responsive"
    {...restProps}
    style={{
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      ...style,
    }}
  >
    {children}
  </div>
);

TableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

TableContainer.defaultProps = {
  style: null,
};
