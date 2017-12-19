import React from 'react';
import PropTypes from 'prop-types';
import { Popover, List } from 'material-ui';
import { withStyles } from 'material-ui/styles';

export class ContainerComponent extends React.PureComponent {
  render() {
    const { open, anchorEl, requestClose, children } = this.props;
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onRequestClose={requestClose}
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
  anchorEl: PropTypes.node.isRequired,
  requestClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  open: PropTypes.bool,
};

ContainerComponent.defaultProps = {
  open: false,
};
