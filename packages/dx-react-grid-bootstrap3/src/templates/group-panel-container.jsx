import * as React from 'react';
import PropTypes from 'prop-types';

export const GroupPanelContainer = ({
  children, style, forwardedRef, ...restProps
}) => (
  <div
    ref={forwardedRef}
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
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelContainer.defaultProps = {
  children: undefined,
  style: null,
  forwardedRef: undefined,
};
