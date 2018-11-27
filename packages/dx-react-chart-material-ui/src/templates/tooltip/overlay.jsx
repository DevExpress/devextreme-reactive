import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';

export const Overlay = ({
  children, target, ...restProps
}) => (
  <Popover
    open
    anchorEl={target}
    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
    transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    {...restProps}
  >
    {children}
  </Popover>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.func.isRequired,
};
