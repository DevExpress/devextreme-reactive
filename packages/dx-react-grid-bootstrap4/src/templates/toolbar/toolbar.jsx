import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const Toolbar = ({
  children,
  className,
  style,
  ...restProps
}) => (
  <div
    className={classNames('card-header py-2 d-flex position-relative dx-g-bs4-toolbar', className)}
    style={style}
    {...restProps}
  >
    {children}
  </div>
);

Toolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Toolbar.defaultProps = {
  className: undefined,
  style: null,
};
