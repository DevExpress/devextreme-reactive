import * as React from 'react';
import * as PropTypes from 'prop-types';

export const CellContent = ({
  children, align, showGroupingControls, style, ...restProps
}) => (
  <div
    style={{
      ...(showGroupingControls
        ? { [`margin${align === 'right' ? 'Left' : 'Right'}`]: '14px' }
        : null),
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
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
  showGroupingControls: PropTypes.bool,
  style: PropTypes.object,
};

CellContent.defaultProps = {
  align: 'left',
  showGroupingControls: false,
  style: null,
};
