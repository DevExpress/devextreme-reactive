import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplateConnector,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
];

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      appointmentContentComponent: AppointmentContent,
    } = this.props;

    return (
      <Plugin
        name="Appointments"
        dependencies={pluginDependencies}
      >
        <TemplateConnector>
          {(getters, actions) => {
            return (
              <Template
                name="appointment"
              >
                {({
                  onClick, onDoubleClick,
                  data, type, style,
                  ...restParams
                }) => (
                  <Appointment
                    style={style}
                    data={data}
                    changeAppointment={actions.changeAppointment}
                    commitChangedAppointment={actions.commitChangedAppointment}
                    {...createClickHandlers(onClick, onDoubleClick)}
                    {...restParams}
                  >
                    <AppointmentContent
                      data={data}
                      type={type}
                    />
                  </Appointment>
                )}
              </Template>
            );
          }}
        </TemplateConnector>
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
