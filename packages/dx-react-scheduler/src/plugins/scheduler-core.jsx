import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { appointments } from '@devexpress/dx-scheduler-core';

const defaultAppointmentFields = {
  title: appointment => appointment.title,
  startDate: appointment => appointment.startDate,
  endDate: appointment => appointment.endDate,
  allDay: appointment => appointment.allDay,
  id: appointment => appointment.id,
};

export class SchedulerCore extends React.PureComponent {
  render() {
    const {
      data,
      rootComponent: Root,
      appointmentFields,
    } = this.props;

    const appointmentsComputed = getters => appointments(
      data,
      getters.getAppointmentStartDate,
      getters.getAppointmentEndDate,
      getters.getAppointmentAllDay,
    );

    const appointmentFunctions = {
      ...defaultAppointmentFields,
      ...appointmentFields,
    };

    const getAppointmentField = (appointment, fieldName) => {
      return appointmentFunctions[fieldName](appointment);
    };

    return (
      <Plugin
        name="SchedulerCore"
      >
        <Getter name="getAppointmentField" value={getAppointmentField} />

        <Getter name="appointments" computed={appointmentsComputed} />
        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

SchedulerCore.propTypes = {
  data: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  appointmentFields: PropTypes.object.isRequired,
  // getAppointmentTitle: PropTypes.func.isRequired,
  // getAppointmentStartDate: PropTypes.func.isRequired,
  // getAppointmentEndDate: PropTypes.func.isRequired,
  // getAppointmentAllDay: PropTypes.func.isRequired,
  // getAppointmentId: PropTypes.func.isRequired,
};
