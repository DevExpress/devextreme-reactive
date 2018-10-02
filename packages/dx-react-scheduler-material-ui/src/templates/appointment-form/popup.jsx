import * as React from 'react';
import * as PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

export const Popup = ({
  container: Container,
  editor,
  button,
  checkbox,
  visible,
  appointment,
  readOnly,
  onVisibilityChange,
  onAppointmentChange,
  ...restProps
}) => (
  <Modal
    open={visible}
    {...restProps}
  >
    <Container
      editor={editor}
      button={button}
      checkbox={checkbox}
      appointment={appointment}
      readOnly={readOnly}
      onAppointmentChange={onAppointmentChange}
      onVisibilityChange={onVisibilityChange}
    />
  </Modal>
);

Popup.propTypes = {
  container: PropTypes.func,
  editor: PropTypes.func,
  button: PropTypes.func,
  checkbox: PropTypes.func,
  visible: PropTypes.bool,
  appointment: PropTypes.object,
  readOnly: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
  onAppointmentChange: PropTypes.func,
};

Popup.defaultProps = {
  container: () => undefined,
  editor: () => undefined,
  button: () => undefined,
  checkbox: () => undefined,
  visible: false,
  appointment: {},
  readOnly: false,
  onVisibilityChange: () => undefined,
  onAppointmentChange: () => undefined,
};
