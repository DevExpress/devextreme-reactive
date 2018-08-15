import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector, Action,
} from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'Appointment' },
];

export class AppointmentTooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      target: null,
      appointment: {},
      visible: false,
    };

    this.targetRef = this.targetRef.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.currentAppointment = this.currentAppointment.bind(this);
  }

  targetRef(target) {
    this.setState({ target });
  }

  currentAppointment(appointment) {
    const { visible } = this.state;
    this.setState({ appointment, visible: !visible });
  }

  toggleVisible() {
    const { visible } = this.state;
    this.setState({ visible: !visible });
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
        <Action name="tooltipRef" action={this.targetRef} />
        <Action name="currentAppointment" action={this.currentAppointment} />
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
};

AppointmentTooltip.defaultProps = {
  showOpenButton: false,
  showDeleteButton: false,
  showCloseButton: false,
};
