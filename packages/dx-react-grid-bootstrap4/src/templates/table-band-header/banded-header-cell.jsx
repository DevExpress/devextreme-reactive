import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './banded-header-cell.css';

export const BandedHeaderCell = ({ component: HeaderCellComponent, className, ...restProps }) => (
  <HeaderCellComponent className={classNames('dx-rg-bs4-banded-header-cell border-left border-right', className)} {...restProps} />
);

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BandedHeaderCell.defaultProps = {
  className: undefined,
};
