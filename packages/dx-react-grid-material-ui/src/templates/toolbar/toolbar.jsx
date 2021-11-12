import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import ToolbarMUI from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { getBorder } from '../utils';

const PREFIX = 'Toolbar';
export const classes = {
  toolbar: `${PREFIX}-toolbar`,
};
const StyledToolbarMUI = styled(ToolbarMUI)(({ theme }) => ({
  [`&.${classes.toolbar}`]: {
    borderBottom: getBorder(theme),
    flex: 'none',
  },
}));

const ToolbarBase = ({
  children, className, style, forwardedRef, ...restProps
}) => (
  <StyledToolbarMUI
    style={style}
    className={classNames(classes.toolbar, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </StyledToolbarMUI>
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
