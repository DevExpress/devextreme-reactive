import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableSummaryItem = ({
  children, style, ...restProps
}) => (
  <div
    style={{
      fontWeight: 'bold',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

TableSummaryItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

TableSummaryItem.defaultProps = {
  children: undefined,
  style: null,
};
