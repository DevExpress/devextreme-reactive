import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Container = ({
  children,
  className,
  style,
  ...restProps
}) => (
  <div
    className={classNames('list-group', className)}
    style={{ marginBottom: 0, ...style }}
    {...restProps}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Container.defaultProps = {
  className: undefined,
  style: undefined,
};
