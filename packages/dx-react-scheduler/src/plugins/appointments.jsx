import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template,
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
