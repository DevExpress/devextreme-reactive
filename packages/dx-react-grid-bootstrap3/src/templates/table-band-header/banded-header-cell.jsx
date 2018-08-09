import * as React from 'react';
import * as PropTypes from 'prop-types';

export const BandedHeaderCell = ({ component: HeaderCellComponent, style, ...restProps }) => (
  <HeaderCellComponent
    style={{
      borderRight: '1px solid #ddd',
      borderTop: 'none',
      ...style,
    }}
    {...restProps}
  />
);

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  style: PropTypes.object,
};

BandedHeaderCell.defaultProps = {
  style: null,
};
