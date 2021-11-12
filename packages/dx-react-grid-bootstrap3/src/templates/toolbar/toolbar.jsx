import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const ToolbarBase = ({
  children,
  className,
  style,
  forwardedRef,
  ...restProps
}) => (
  <div
    className={classNames('panel-heading', className)}
    ref={forwardedRef}
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

ToolbarBase.propTypes = {
  children: PropTypes.node.isRequired,
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
