import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const GroupPanelContainer = ({ children, className, ...restProps }) => (
  <div
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
};

GroupPanelContainer.defaultProps = {
  children: null,
  className: undefined,
};
