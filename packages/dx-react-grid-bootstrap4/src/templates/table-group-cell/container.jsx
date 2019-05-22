import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Container = ({
  children, className, style, ...restProps
}) => (
  <div
    className={classNames('position-sticky dx-g-bs4-fixed-group-cell', className)}
    style={style}
    {...restProps}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Container.defaultProps = {
  children: undefined,
  className: undefined,
  style: null,
};
