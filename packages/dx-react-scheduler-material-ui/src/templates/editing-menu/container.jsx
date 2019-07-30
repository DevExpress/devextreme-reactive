import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Container = ({
  children, className, containerRef, ...restProps
}) => (
  <div ref={containerRef} style={{ position: 'absolute', width: '100%', height: '100%' }} {...restProps}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Container.defaultProps = {
  className: undefined,
  children: null,
};
