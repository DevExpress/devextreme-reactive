import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { SchedulerCore } from './plugins/scheduler-core';

export const Scheduler = ({
  data,
  rootComponent,
  children,
  getTitle,
  getStartDate,
  getEndDate,
  getAllDay,
  getId,
}) => (
  <PluginHost>
    <SchedulerCore
      data={data}
      rootComponent={rootComponent}
      appointmentExtension
      getTitle={getTitle}
      getStartDate={getStartDate}
      getEndDate={getEndDate}
      getAllDay={getAllDay}
      getId={getId}
    />
    {children}
  </PluginHost>
);

Scheduler.propTypes = {
  data: PropTypes.array,
  rootComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
  getTitle: PropTypes.func,
  getStartDate: PropTypes.func,
  getEndDate: PropTypes.func,
  getAllDay: PropTypes.func,
  getId: PropTypes.func,
};

Scheduler.defaultProps = {
  children: undefined,
  data: [],
  getTitle: appointment => appointment.title,
  getStartDate: appointment => appointment.startDate,
  getEndDate: appointment => appointment.endDate,
  getAllDay: appointment => appointment.allDay,
  getId: appointment => appointment.id,
};
