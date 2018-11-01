import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { SchedulerCore } from './plugins/scheduler-core';

export const Scheduler = ({
  data,
  rootComponent,
  children,
  mapAppointmentData,
}) => (
  <PluginHost>
    <SchedulerCore
      data={data}
      rootComponent={rootComponent}
      mapAppointmentData={mapAppointmentData}
    />
    {children}
  </PluginHost>
);

Scheduler.propTypes = {
  data: PropTypes.array,
  rootComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
  mapAppointmentData: PropTypes.func,
};

Scheduler.defaultProps = {
  children: undefined,
  data: [],
  mapAppointmentData: appointment => appointment,
};
