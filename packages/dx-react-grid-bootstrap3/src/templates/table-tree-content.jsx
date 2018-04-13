import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableTreeContent = ({
  children, style, ...restProps
}) => (
  <div
    style={{
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

TableTreeContent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

TableTreeContent.defaultProps = {
  children: undefined,
  style: null,
};
