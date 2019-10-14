import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const ContainerBase = ({
  children, classes, className, ...restProps
}) => (
  <div className={classNames(classes.container, className)} {...restProps}>
    {children}
  </div>
);

ContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
};
