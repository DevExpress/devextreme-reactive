import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'Container';

export const classes = {
  container: `${PREFIX}-container`,
};

export const ContainerBase = ({
  children, className, ...restProps
}) => (
  <div className={classNames(classes.container, className)} {...restProps}>
    {children}
  </div>
);

ContainerBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
};
