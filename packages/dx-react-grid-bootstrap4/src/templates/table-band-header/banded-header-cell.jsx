import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BandedHeaderCell = ({ component: HeaderCellComponent, className, ...restProps }) => (
  <HeaderCellComponent
    className={classNames('dx-g-bs4-banded-header-cell border-right', className)}
    {...restProps}
  />
);

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BandedHeaderCell.defaultProps = {
  className: undefined,
};
