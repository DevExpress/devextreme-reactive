import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

export const ToolbarBase = ({
  children,
  className,
  style,
  forwardedRef,
  ...restProps
}) => (
  <div
    className={classNames('card-header py-2 d-flex position-relative dx-g-bs4-toolbar', className)}
    ref={forwardedRef}
    style={style}
    {...restProps}
  >
    {children}
  </div>
);

ToolbarBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  forwardedRef: PropTypes.func,
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null,
  forwardedRef: undefined,
};

export const Toolbar = withKeyboardNavigation('toolbar', 'none')(ToolbarBase);
