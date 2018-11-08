import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';

export const Overlay = ({
  visible, children, target, ...restProps
}) => (
  <Popover
    open={visible}
    anchorEl={target}
    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...restProps}
  >
    {children}
  </Popover>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  target: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
};

Overlay.defaultProps = {
  visible: false,
  target: null,
};
