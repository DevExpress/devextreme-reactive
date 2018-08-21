import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Title = ({
  children, style, ...restProps
}) => (
  <div
    style={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};

Title.defaultProps = {
  style: null,
  children: undefined,
};
