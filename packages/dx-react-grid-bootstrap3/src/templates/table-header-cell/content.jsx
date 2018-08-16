import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Content = ({
  column, children, align, style, ...restProps
}) => (
  <span
    style={{
      textAlign: align,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </span>
);

Content.propTypes = {
  column: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  align: PropTypes.string,
  style: PropTypes.object,
};

Content.defaultProps = {
  column: undefined,
  align: 'left',
  style: null,
  children: undefined,
};
