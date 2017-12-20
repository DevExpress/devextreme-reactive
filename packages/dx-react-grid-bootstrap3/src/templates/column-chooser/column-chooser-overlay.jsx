import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';

export class OverlayComponent extends React.PureComponent {
  render() {
    const { open, anchorEl, children } = this.props;
    return (
      <Overlay
        show={open}
        target={anchorEl}
        placement="bottom"
        container={this}
        containerPadding={20}
      >
        <Popover id="popover-contained" title="Popover bottom" rootClose>
          {children}
        </Popover>
      </Overlay>
    );
  }
}

OverlayComponent.propTypes = {
  anchorEl: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};

OverlayComponent.defaultProps = {
  open: false,
};
