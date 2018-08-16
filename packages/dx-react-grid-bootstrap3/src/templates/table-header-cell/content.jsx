import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Content = ({
  children, align, style, ...restProps
}) => (
  <div
    style={{
      textAlign: align,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '3px',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  align: PropTypes.string,
  style: PropTypes.object,
};

Content.defaultProps = {
  align: 'left',
  style: null,
  children: undefined,
};
