import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Root = ({
  children, className, style, ...restProps
}) => (
  <div
    className={classNames('panel panel-default', className)}
    style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Root.defaultProps = {
  children: undefined,
  className: undefined,
  style: null,
};
