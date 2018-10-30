import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { appointments } from '@devexpress/dx-scheduler-core';

export class SchedulerCore extends React.PureComponent {
  render() {
    const {
      data,
      rootComponent: Root,
      appointmentMapping,

      getAppointmentTitle,
      getAppointmentStartDate,
      getAppointmentEndDate,
      getAppointmentAllDay,
      getAppointmentId,
    } = this.props;

    const appointmentsComputed = getters => appointments(
      data,
      // getters.getAppointmentStartDate,
      // getters.getAppointmentEndDate,
      // getters.getAppointmentAllDay,
      getters.appointmentMapping,
    );

    return (
      <Plugin
        name="SchedulerCore"
      >
        <Getter name="getAppointmentTitle" value={getAppointmentTitle} />
        <Getter name="getAppointmentStartDate" value={getAppointmentStartDate} />
        <Getter name="getAppointmentEndDate" value={getAppointmentEndDate} />
        <Getter name="getAppointmentAllDay" value={getAppointmentAllDay} />
        <Getter name="getAppointmentId" value={getAppointmentId} />

        <Getter name="appointmentMapping" value={appointmentMapping} />
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
  appointmentMapping: PropTypes.func.isRequired,
  getAppointmentTitle: PropTypes.func.isRequired,
  getAppointmentStartDate: PropTypes.func.isRequired,
  getAppointmentEndDate: PropTypes.func.isRequired,
  getAppointmentAllDay: PropTypes.func.isRequired,
  getAppointmentId: PropTypes.func.isRequired,
};
