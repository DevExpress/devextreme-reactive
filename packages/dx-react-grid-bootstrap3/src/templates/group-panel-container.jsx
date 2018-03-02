import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupPanelContainer = ({ children, style, ...restProps }) => (
  <div
    style={{
      width: '100%',
      marginTop: '5px',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

GroupPanelContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

GroupPanelContainer.defaultProps = {
  children: undefined,
  style: null,
};
