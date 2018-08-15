import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Action,
  createStateHelper,
} from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'Appointment' },
];

export class AppointmentTooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      target, appointment, visible,
      onAppointmentChange,
      onTargetChange,
      onVisibleChange,
    } = this.props;

    this.state = {
      appointment,
      target,
      visible,
    };

    const stateHelper = createStateHelper(
      this,
      {
        appointment: () => onAppointmentChange,
        visible: () => onVisibleChange,
        target: () => onTargetChange,
      },
    );

    const setAppointment = (currApp, { appointment: app }) => app;
    const toggleVisible = () => {
      const { visible: vis } = this.state;
      return !vis;
    };

    this.setTarget = stateHelper.applyFieldReducer
      .bind(stateHelper, 'target', (_, { target: value }) => value);
    this.toggleVisible = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisible);
    this.setCurrentAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointment', setAppointment);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      appointment = prevState.appointment,
      target = prevState.target,
      visible = prevState.visible,
    } = nextProps;
    return {
      appointment,
      target,
      visible,
    };
  }

  render() {
    const {
      showOpenButton,
      showDeleteButton,
      showCloseButton,
      tooltipComponent: Tooltip,
      headComponent: Head,
      contentComponent: Content,
      openButtonComponent: OpenButton,
      deleteButtonComponent: DeleteButton,
      closeButtonComponent: CloseButton,
    } = this.props;
    const { appointment, target, visible } = this.state;

    return (
      <Plugin
        name="AppointmentTooltip"
        dependencies={pluginDependencies}
      >
        <Action name="setTooltipTarget" action={this.setTarget} />
        <Action name="setTooltipAppointment" action={this.setCurrentAppointment} />
        <Action name="toggleTooltipVisible" action={this.toggleVisible} />
        <Template name="main">
          <TemplateConnector>
            {({
              getAppointmentEndDate,
              getAppointmentStartDate,
              getAppointmentTitle,
            }) => (
              <React.Fragment>
                <TemplatePlaceholder />
                <Tooltip
                  showOpenButton={showOpenButton}
                  showDeleteButton={showDeleteButton}
                  showCloseButton={showCloseButton}
                  openButtonComponent={OpenButton}
                  deleteButtonComponent={DeleteButton}
                  closeButtonComponent={CloseButton}
                  headComponent={Head}
                  contentComponent={Content}
                  appointment={appointment}
                  target={target}
                  visible={visible}
                  onHide={this.toggleVisible}

                  getAppointmentTitle={getAppointmentTitle}
                  getAppointmentStartDate={getAppointmentStartDate}
                  getAppointmentEndDate={getAppointmentEndDate}
                />
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

AppointmentTooltip.propTypes = {
  tooltipComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  openButtonComponent: PropTypes.func.isRequired,
  deleteButtonComponent: PropTypes.func.isRequired,
  closeButtonComponent: PropTypes.func.isRequired,
  showOpenButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  appointment: PropTypes.object,
  visible: PropTypes.bool,
  target: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  onVisibleChange: PropTypes.func,
  onTargetChange: PropTypes.func,
  onAppointmentChange: PropTypes.func,
};

AppointmentTooltip.defaultProps = {
  onAppointmentChange: undefined,
  onTargetChange: undefined,
  onVisibleChange: undefined,
  appointment: {},
  visible: false,
  target: null,
  showOpenButton: false,
  showDeleteButton: false,
  showCloseButton: false,
};
