import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplateConnector,
} from '@devexpress/dx-react-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
    } = this.props;

    return (
      <Plugin name="Appointment">
        <Template
          name="appointment"
        >
          {params => (
            <TemplateConnector>
              {({
                getAppointmentTitle,
                getAppointmentStartDate,
                getAppointmentEndDate,
              }) => (
                <Appointment
                  {...params}
                  getTitle={getAppointmentTitle}
                  getStartDate={getAppointmentStartDate}
                  getEndDate={getAppointmentEndDate}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
};
