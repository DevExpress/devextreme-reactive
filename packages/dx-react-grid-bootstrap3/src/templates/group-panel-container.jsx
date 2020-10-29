import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupPanelContainer = React.forwardRef(({
  children, style, ...restProps
}, ref) => (
  <div
    ref={ref}
    style={{
      width: '100%',
      marginTop: '5px',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
));

GroupPanelContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

GroupPanelContainer.defaultProps = {
  children: undefined,
  style: null,
};
