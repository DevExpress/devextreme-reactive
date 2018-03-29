import * as React from 'react';
import * as PropTypes from 'prop-types';

export const CellContent = ({
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

CellContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  align: PropTypes.string,
  style: PropTypes.object,
};

CellContent.defaultProps = {
  align: 'left',
  style: null,
  children: undefined,
};
