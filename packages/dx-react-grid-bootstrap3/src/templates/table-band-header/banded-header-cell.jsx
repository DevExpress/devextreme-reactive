import * as React from 'react';
import * as PropTypes from 'prop-types';

export const BandedHeaderCell = ({ component: HeaderCellComponent, style, ...restProps }) => (
  <HeaderCellComponent
    style={{
      borderLeft: '1px solid #ddd',
      borderRight: '1px solid #ddd',
      borderTop: 0,
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
