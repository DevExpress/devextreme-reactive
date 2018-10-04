import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Action,
  createStateHelper,
} from '@devexpress/dx-react-core';
import {
  setAppointment,
  COMMIT_COMMAND_BUTTON,
  CANCEL_COMMAND_BUTTON,
} from '@devexpress/dx-scheduler-core';

const defaultMessages = {
  allDayText: 'All Day',
  titleLabel: 'Title',
  startDateLabel: 'Start Date',
  endDateLabel: 'End Date',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
};

export class AppointmentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      appointment: props.appointment,
    };

    const stateHelper = createStateHelper(
      this,
      {
        visible: () => props.onVisibilityChange,
        appointment: () => props.onAppointmentChange,
      },
    );

    const toggleVisibility = () => {
      const { visible: isOpen } = this.state;
      return !isOpen;
    };
    this.toggleVisibility = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisibility);
    this.setAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointment', setAppointment);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      visible = prevState.visible,
      appointment = prevState.appointment,
    } = nextProps;
    return {
      appointment,
      visible,
    };
  }

  render() {
    const {
      allDayEditorComponent: AllDayEditor,
      containerComponent: Container,
      scrollableSpaceContainer: ScrollableSpace,
      staticSpaceContainer: StaticSpace,
      popupComponent: Popup,
      dateEditorComponent: DateEditor,
      textEditorComponent: TextEditor,
      commandButtonComponent: CommandButton,
      readOnly,
      messages,
    } = this.props;
    const { visible } = this.state;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    return (
      <Plugin
        name="AppointmentForm"
      >
        <Action name="toggleFormVisibility" action={this.toggleVisibility} />
        <Action name="setFormAppointment" action={this.setAppointment} />

        <Popup
          visible={visible}
        >
          <Container>
            <ScrollableSpace>
              <TextEditor
                readOnly={readOnly}
                label={getMessage('titleLabel')}
              />
              <DateEditor
                readOnly={readOnly}
                label={getMessage('startDateLabel')}
              />
              <DateEditor
                readOnly={readOnly}
                label={getMessage('endDateLabel')}
              />
              <AllDayEditor
                text={getMessage('allDayText')}
              />
            </ScrollableSpace>
            <StaticSpace>
              <CommandButton
                text={getMessage('cancelCommand')}
                readOnly={readOnly}
                onExecute={this.toggleVisibility}
                id={CANCEL_COMMAND_BUTTON}
              />
              <CommandButton
                text={getMessage('commitCommand')}
                readOnly={readOnly}
                onExecute={this.toggleVisibility}
                id={COMMIT_COMMAND_BUTTON}
              />
            </StaticSpace>
          </Container>
        </Popup>
      </Plugin>
    );
  }
}

AppointmentForm.propTypes = {
  popupComponent: PropTypes.func.isRequired,
  dateEditorComponent: PropTypes.func.isRequired,
  textEditorComponent: PropTypes.func.isRequired,
  commandButtonComponent: PropTypes.func.isRequired,
  allDayEditorComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  scrollableSpaceContainer: PropTypes.func.isRequired,
  staticSpaceContainer: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  visible: PropTypes.bool,
  appointment: PropTypes.object,
  onVisibilityChange: PropTypes.func,
  onAppointmentChange: PropTypes.func,
  messages: PropTypes.shape({
    allDayText: PropTypes.string,
    titleLabel: PropTypes.string,
    startDateLabel: PropTypes.string,
    endDateLabel: PropTypes.string,
    commitCommand: PropTypes.string,
    cancelCommand: PropTypes.string,
  }),
};

AppointmentForm.defaultProps = {
  readOnly: false,
  visible: undefined,
  appointment: undefined,
  onVisibilityChange: () => undefined,
  onAppointmentChange: () => undefined,
  messages: {},
};

AppointmentForm.components = {
  popupComponent: 'Popup',
  containerComponent: 'Container',
  dateEditorComponent: 'DateEditor',
  textEditorComponent: 'TextEditor',
  commandButtonComponent: 'CommandButton',
  allDayEditorComponent: 'AllDayEditor',
  scrollableSpaceContainer: 'ScrollableSpace',
  staticSpaceContainer: 'StaticSpace',
};
