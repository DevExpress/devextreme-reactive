import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BandedHeaderCell = ({
  component: HeaderCellComponent, className, leftBorder, ...restProps
}) => (
  <HeaderCellComponent
    className={classNames({
      'dx-g-bs4-banded-header-cell border-right': true,
      'border-left': leftBorder,
    }, className)}
    {...restProps}
  />
);

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
  leftBorder: PropTypes.bool,
};

BandedHeaderCell.defaultProps = {
  className: undefined,
  leftBorder: false,
};
