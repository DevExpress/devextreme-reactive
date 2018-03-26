import * as React from 'react';
import * as PropTypes from 'prop-types';

export const BandHeaderCell = ({ component: Component, style, ...restProps }) => (
  <Component
    style={{
      ...style,
      borderLeft: '1px solid #ddd',
      borderRight: '1px solid #ddd',
      borderTop: 0,
    }}
    {...restProps}
  />
);

BandHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  style: PropTypes.object,
};

BandHeaderCell.defaultProps = {
  style: null,
};
