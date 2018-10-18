import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplateConnector,
} from '@devexpress/dx-react-core';
import { createHandlers } from '@devexpress/dx-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
    } = this.props;

    return (
      <Plugin name="Appointments">
        <Template
          name="appointment"
        >
          {({ onClick, onDoubleClick, ...params }) => (
            <TemplateConnector>
              {({
                getAppointmentTitle,
                getAppointmentStartDate,
                getAppointmentEndDate,
              }) => (
                <Appointment
                  {...params}
                  {...createHandlers(onClick, onDoubleClick)}
                  getTitle={getAppointmentTitle}
                  getEndDate={getAppointmentEndDate}
                  getStartDate={getAppointmentStartDate}
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

Appointments.components = {
  appointmentComponent: 'Appointment',
};
