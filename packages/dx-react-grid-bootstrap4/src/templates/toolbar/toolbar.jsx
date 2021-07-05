import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

export const ToolbarBase = ({
  children,
  className,
  style,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <div
    className={classNames('card-header py-2 d-flex position-relative dx-g-bs4-toolbar', className)}
    ref={refObject}
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
