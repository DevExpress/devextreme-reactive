import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Toolbar = ({
  children,
  className,
  style,
  ...restProps
}) => (
  <div
    className={classNames('card-header py-2 d-flex position-relative', className)}
    style={{
      alignItems: 'center',
      minHeight: '55px',
      ...style,
    }}
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
