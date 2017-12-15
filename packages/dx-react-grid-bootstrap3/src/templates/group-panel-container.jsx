import React from 'react';
import PropTypes from 'prop-types';

export const GroupPanelContainer = ({ children, ...restProps }) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    }}
    {...restProps}
  >
    {children}
  </div>
);

GroupPanelContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

GroupPanelContainer.defaultProps = {
  children: null,
};

