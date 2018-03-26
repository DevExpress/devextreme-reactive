import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const HeaderCell = ({ component: Component, className, ...restProps }) => (
  <Component className={classNames('dx-rg-bs4-band border-left border-right', className)} {...restProps} />
);

HeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
};

HeaderCell.defaultProps = {
  className: undefined,
};
