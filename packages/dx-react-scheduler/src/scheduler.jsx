import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { SchedulerCore } from './plugins/scheduler-core';

export const Scheduler = ({
  data,
  rootComponent,
  children,
  appointmentFields,
  getAppointmentTitle,
  getAppointmentStartDate,
  getAppointmentEndDate,
  getAppointmentAllDay,
  getAppointmentId,
}) => (
  <PluginHost>
    <SchedulerCore
      data={data}
      rootComponent={rootComponent}
      appointmentFields={appointmentFields}
      getAppointmentTitle={getAppointmentTitle}
      getAppointmentStartDate={getAppointmentStartDate}
      getAppointmentEndDate={getAppointmentEndDate}
      getAppointmentAllDay={getAppointmentAllDay}
      getAppointmentId={getAppointmentId}
    />
    {children}
  </PluginHost>
);

Scheduler.propTypes = {
  data: PropTypes.array,
  rootComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
  appointmentFields: PropTypes.object,
  getAppointmentTitle: PropTypes.func,
  getAppointmentStartDate: PropTypes.func,
  getAppointmentEndDate: PropTypes.func,
  getAppointmentAllDay: PropTypes.func,
  getAppointmentId: PropTypes.func,
};

Scheduler.defaultProps = {
  children: undefined,
  data: [],
  appointmentFields: {},
  getAppointmentTitle: appointment => appointment.title,
  getAppointmentStartDate: appointment => appointment.startDate,
  getAppointmentEndDate: appointment => appointment.endDate,
  getAppointmentAllDay: appointment => appointment.allDay,
  getAppointmentId: appointment => appointment.id,
};
