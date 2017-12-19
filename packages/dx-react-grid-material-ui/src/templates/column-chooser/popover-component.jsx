import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'material-ui';

export class PopoverComponent extends React.PureComponent {
  render() {
    const { open, onRequestClose, children } = this.props;
    return (
      <Popover
        open={open}
        onClose={onRequestClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {children}
      </Popover>
    );
  }
}

PopoverComponent.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};

PopoverComponent.defaultProps = {
  open: false,
};
