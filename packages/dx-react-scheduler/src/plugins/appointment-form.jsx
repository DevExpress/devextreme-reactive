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
    } = this.props;
    const { visible } = this.state;

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
                label="Subject"
              />
              <DateEditor
                appointment={appointment}
                readOnly={readOnly}
                label="Start Date"
                type="datetime-local"
              />
              <DateEditor
                appointment={appointment}
                readOnly={readOnly}
                label="End Date"
                type="datetime-local"
              />
              <AllDayEditor
                text="All Day"
                appointment={appointment}
              />
            </ScrollableSpace>
            <StaticSpace>
              <Button
                text="cancel"
                readOnly={readOnly}
                appointment={appointment}
              />
              <Button
                text="save"
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
};

AppointmentForm.defaultProps = {
  readOnly: false,
  visible: undefined,
  defaultVisible: true,
  appointment: {},
  onVisibilityChange: () => undefined,
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
