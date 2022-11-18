import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const BandedHeaderCell = ({
  component: HeaderCellComponent, className, beforeBorder, ...restProps
}) => (
  <HeaderCellComponent
    className={classNames({
      'dx-g-bs4-banded-header-cell border-right': true,
      'border-left': beforeBorder,
    }, className)}
    {...restProps}
  />
);

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
};

BandedHeaderCell.defaultProps = {
  className: undefined,
  beforeBorder: false,
};
