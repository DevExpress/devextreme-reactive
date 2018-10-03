import * as React from 'react';
import * as PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

export const Popup = ({
  children, visible, ...restProps
}) => (
  <Modal
    open={visible}
    {...restProps}
  >
    {children}
  </Modal>
);

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

Popup.defaultProps = {
  visible: false,
};
