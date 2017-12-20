import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';

export class OverlayComponent extends React.PureComponent {
  render() {
    const { open, anchorEl, children, onRequestClose } = this.props;

    return (
      <Overlay
        show={open}
        target={anchorEl}
        onHide={onRequestClose}
        placement="bottom"
        rootClose
      >
        <Popover id="popover-contained">
          {children}
        </Popover>
      </Overlay>
    );
  }
}

OverlayComponent.propTypes = {
  anchorEl: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

OverlayComponent.defaultProps = {
  open: false,
};
