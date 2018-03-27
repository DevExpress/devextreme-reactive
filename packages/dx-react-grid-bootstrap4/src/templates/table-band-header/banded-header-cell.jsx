import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BandedHeaderCell = ({ component: Component, className, ...restProps }) => (
  <Component className={classNames('dx-rg-bs4-band border-left border-right', className)} {...restProps} />
);

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BandedHeaderCell.defaultProps = {
  className: undefined,
};
