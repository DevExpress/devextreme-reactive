import React from 'react';
import PropTypes from 'prop-types';
import { Popover, List } from 'material-ui';
import { withStyles } from 'material-ui/styles';

export class ContainerComponent extends React.PureComponent {
  render() {
    const { open, anchorEl, onRequestClose, children } = this.props;
    return (
      <Popover
        open={open}
        onClose={onRequestClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List dense>
          {children}
        </List>
      </Popover>
    );
  }
}

ContainerComponent.propTypes = {
  // anchorEl: PropTypes.node.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  open: PropTypes.bool,
};

ContainerComponent.defaultProps = {
  open: false,
};
