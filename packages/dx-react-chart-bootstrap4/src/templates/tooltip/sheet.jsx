import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Sheet = ({ className, ...restProps }) => (
  <div className={classNames('popover-body', className)} {...restProps} />
);

Sheet.propTypes = {
  className: PropTypes.string,
};

Sheet.defaultProps = {
  className: undefined,
};
