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
    className={classNames('panel-heading', className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: '55px',
      padding: '0px 15px',
      flex: 'none',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Toolbar.defaultProps = {
  className: undefined,
  style: null,
};
