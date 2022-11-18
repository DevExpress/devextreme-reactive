import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const GroupPanelContainer = ({
  children, className, forwardedRef, ...restProps
}) => (
  <div
    ref={forwardedRef}
    className={classNames('w-100 mt-1', className)}
    {...restProps}
  >
    {children}
  </div>
);

GroupPanelContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelContainer.defaultProps = {
  children: null,
  className: undefined,
  forwardedRef: undefined,
};
