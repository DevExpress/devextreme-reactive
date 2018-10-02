import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Action,
  createStateHelper,
} from '@devexpress/dx-react-core';

export class AppointmentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || props.defaultVisible,
    };

    const stateHelper = createStateHelper(
      this,
      {
        visible: () => props.onVisibilityChange,
      },
    );

    const toggleVisibility = () => {
      const { visible: isOpen } = this.state;
      return !isOpen;
    };
    this.toggleVisibility = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisibility);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      visible = prevState.visible,
    } = nextProps;
    return {
      visible,
    };
  }

  render() {
    const {
      popupComponent: Popup,
      containerComponent: container,
      editorComponent: editor,
      buttonComponent: button,
      checkboxComponent: checkbox,
      appointment,
      readOnly,
      onAppointmentChange,
    } = this.props;
    const { visible } = this.state;

    return (
      <Plugin
        name="AppointmentForm"
      >
        <Action name="toggleFormVisibility" action={this.toggleVisibility} />

        <Popup
          container={container}
          editor={editor}
          button={button}
          checkbox={checkbox}
          visible={visible}
          appointment={appointment}
          readOnly={readOnly}
          onVisibilityChange={this.toggleVisibility}
          onAppointmentChange={onAppointmentChange}
        />
      </Plugin>
    );
  }
}

AppointmentForm.propTypes = {
  popupComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  editorComponent: PropTypes.func.isRequired,
  buttonComponent: PropTypes.func.isRequired,
  checkboxComponent: PropTypes.func.isRequired,
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
  defaultVisible: true,
  appointment: {},
  onVisibilityChange: undefined,
  onAppointmentChange: undefined,
};

AppointmentForm.components = {
  popupComponent: 'Popup',
  containerComponent: 'Container',
  editorComponent: 'Editor',
  buttonComponent: 'Button',
  checkboxComponent: 'Checkbox',
};
