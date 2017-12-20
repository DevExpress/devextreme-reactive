import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'material-ui';

export class PopoverComponent extends React.PureComponent {
  render() {
    const {
      open, onRequestClose,
      children, anchorEl,
      ...restProps
    } = this.props;
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onRequestClose={onRequestClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...restProps}
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
  anchorEl: PropTypes.object,
};

PopoverComponent.defaultProps = {
  open: false,
  anchorEl: null,
};
