import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Sheet = ({ className, ...restProps }) => (
  <div className={classNames('popover-body', className)} {...restProps} />
);

Sheet.propTypes = {
  className: PropTypes.string,
};

Sheet.defaultProps = {
  className: undefined,
};
