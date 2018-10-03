import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Action,
  createStateHelper,
} from '@devexpress/dx-react-core';

const defaultMessages = {
  allDayText: 'All Day',
  titleLabel: 'Subject',
  startDateLabel: 'Start Date',
  endDateLabel: 'End Date',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
};

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
      allDayEditorComponent: AllDayEditor,
      popupContainer: PopupContainer,
      scrollableSpaceContainer: ScrollableSpace,
      StaticSpaceContainer: StaticSpace,
      popupComponent: Popup,
      dateEditorComponent: DateEditor,
      textEditorComponent: TextEditor,
      buttonComponent: Button,
      appointment,
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

        <Popup
          visible={visible}
        >
          <PopupContainer>
            <ScrollableSpace>
              <TextEditor
                appointment={appointment}
                readOnly={readOnly}
                label={getMessage('titleLabel')}
              />
              <DateEditor
                appointment={appointment}
                readOnly={readOnly}
                label={getMessage('startDateLabel')}
                type="datetime-local"
              />
              <DateEditor
                appointment={appointment}
                readOnly={readOnly}
                label={getMessage('endDateLabel')}
                type="datetime-local"
              />
              <AllDayEditor
                text={getMessage('allDayText')}
                appointment={appointment}
              />
            </ScrollableSpace>
            <StaticSpace>
              <Button
                text={getMessage('cancelCommand')}
                readOnly={readOnly}
                appointment={appointment}
              />
              <Button
                text={getMessage('commitCommand')}
                readOnly={readOnly}
                appointment={appointment}
              />
            </StaticSpace>
          </PopupContainer>
        </Popup>
      </Plugin>
    );
  }
}

AppointmentForm.propTypes = {
  popupComponent: PropTypes.func.isRequired,
  dateEditorComponent: PropTypes.func.isRequired,
  textEditorComponent: PropTypes.func.isRequired,
  buttonComponent: PropTypes.func.isRequired,
  allDayEditorComponent: PropTypes.func.isRequired,
  popupContainer: PropTypes.func.isRequired,
  scrollableSpaceContainer: PropTypes.func.isRequired,
  StaticSpaceContainer: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool,
  appointment: PropTypes.object,
  onVisibilityChange: PropTypes.func,
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
  defaultVisible: false,
  appointment: {},
  onVisibilityChange: () => undefined,
  messages: {},
};

AppointmentForm.components = {
  popupComponent: 'Popup',
  containerComponent: 'Container',
  dateEditorComponent: 'DateEditor',
  textEditorComponent: 'TextEditor',
  buttonComponent: 'Button',
  allDayEditorComponent: 'AllDayEditor',
  popupContainer: 'PopupContainer',
  scrollableSpaceContainer: 'ScrollableSpace',
  StaticSpaceContainer: 'StaticSpace',
};
