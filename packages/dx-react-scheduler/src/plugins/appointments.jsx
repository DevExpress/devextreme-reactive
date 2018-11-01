import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplateConnector,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      appointmentContentComponent: AppointmentContent,
    } = this.props;

    return (
      <Plugin name="Appointments">
        <Template
          name="appointment"
        >
          {({
            onClick, onDoubleClick,
            data, type,
            ...params
          }) => (
            <TemplateConnector>
              {({
                mapAppointmentData,
              }) => (
                <Appointment
                  data={data}
                  {...params}
                  {...createClickHandlers(onClick, onDoubleClick)}
                >
                  <AppointmentContent
                    mapAppointmentData={mapAppointmentData}
                    data={data}
                    type={type}
                  />
                </Appointment>
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
  appointmentContentComponent: PropTypes.func.isRequired,
};

Appointments.components = {
  appointmentComponent: 'Appointment',
  appointmentContentComponent: 'AppointmentContent',
};
