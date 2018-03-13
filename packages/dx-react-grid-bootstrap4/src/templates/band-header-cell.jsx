import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BandHeaderCell = ({ component: Component, className, ...restProps }) => (
  <Component {...restProps} className={classNames('dx-rg-bs4-band border-left border-top-0', className)} />
);

BandHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BandHeaderCell.defaultProps = {
  className: undefined,
};
