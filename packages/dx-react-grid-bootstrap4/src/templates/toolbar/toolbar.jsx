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
    className={classNames(className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: '55px',
      padding: '0px 15px',
      marginBottom: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      flexWrap: 'nowrap',
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
