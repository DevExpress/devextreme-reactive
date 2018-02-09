import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupPanelContainer = ({ children, ...restProps }) => (
  <div
    style={{
      width: '100%',
      marginTop: '5px',
    }}
    {...restProps}
  >
    {children}
  </div>
);

GroupPanelContainer.propTypes = {
  children: PropTypes.node,
};

GroupPanelContainer.defaultProps = {
  children: undefined,
};

