import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const ToolbarBase = ({
  children,
  className,
  style,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <div
    className={classNames('panel-heading', className)}
    ref={refObject}
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
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const Toolbar = withKeyboardNavigation('toolbar', 'none')(ToolbarBase);
