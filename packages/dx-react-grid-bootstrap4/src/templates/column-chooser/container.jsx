import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Container = ({
  children,
  className,
  ...restProps
}) => (
  <div
    className={classNames('py-2', className)}
    {...restProps}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Container.defaultProps = {
  className: undefined,
};
