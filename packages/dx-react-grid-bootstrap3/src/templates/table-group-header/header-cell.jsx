import * as React from 'react';
import * as PropTypes from 'prop-types';

export const HeaderCell = ({ component: Component, style, ...restProps }) => (
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

HeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  style: PropTypes.object,
};

HeaderCell.defaultProps = {
  style: null,
};
