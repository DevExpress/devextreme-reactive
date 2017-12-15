import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Toolbar = ({
  children,
  className,
  ...restProps
}) => (
  <div
    className={classNames('panel-heading', className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: '55px',
      padding: '5px 15px 0 15px',
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
};

Toolbar.defaultProps = {
  className: undefined,
};
