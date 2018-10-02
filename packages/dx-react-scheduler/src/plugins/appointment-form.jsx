import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
} from '@devexpress/dx-react-core';

export class AppointmentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || props.defaultVisible,
    };
  }

  render() {
    const {
      popupComponent: Popup,
      containerComponent: container,
      editorComponents: editor,
      buttonComponents: button,
      appointment,
      readOnly,
      onVisibilityChange,
      onAppointmentChange,
    } = this.props;
    const { visible } = this.state;

    return (
      <Plugin
        name="AppointmentForm"
      >
        <Popup
          container={container}
          editor={editor}
          button={button}
          visible={visible}
          appointment={appointment}
          readOnly={readOnly}
          onVisibilityChange={onVisibilityChange}
          onAppointmentChange={onAppointmentChange}
        />
      </Plugin>
    );
  }
}

AppointmentForm.propTypes = {
  popupComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  editorComponents: PropTypes.func.isRequired,
  buttonComponents: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool,
  appointment: PropTypes.object,
  onVisibilityChange: PropTypes.func,
  onAppointmentChange: PropTypes.func,
};

AppointmentForm.defaultProps = {
  readOnly: false,
  visible: undefined,
  defaultVisible: true, // true => false
  appointment: {},
  onVisibilityChange: undefined,
  onAppointmentChange: undefined,
};

AppointmentForm.components = {
  popupComponent: 'Popup',
  containerComponent: 'Container',
  editorComponents: 'Editor',
  buttonComponents: 'Button',
};
