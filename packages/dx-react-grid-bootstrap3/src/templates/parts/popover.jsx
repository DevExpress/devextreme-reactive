import * as React from 'react';
import PropTypes from 'prop-types';

export const Popover = ({ children, style }) => (
  <div
    className="dropdown-menu"
    style={{
      padding: 0,
      display: 'block',
      border: 'none',
      ...style,
    }}
  >
    {children}
  </div>
);

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Popover.defaultProps = {
  style: null,
};
