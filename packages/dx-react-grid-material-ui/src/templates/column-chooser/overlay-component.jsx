import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'material-ui';

export class OverlayComponent extends React.PureComponent {
  render() {
    const {
      open, onRequestClose,
      children, anchorEl,
    } = this.props;
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onRequestClose={onRequestClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {children}
      </Popover>
    );
  }
}

OverlayComponent.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
};

OverlayComponent.defaultProps = {
  open: false,
  anchorEl: null,
};
