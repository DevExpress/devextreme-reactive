import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { SchedulerCore } from './plugins/scheduler-core';

export const Scheduler = ({
  data,
  currentDate,
  rootComponent,
  children,
}) => (
  <PluginHost>
    <SchedulerCore
      data={data}
      currentDate={currentDate}
      rootComponent={rootComponent}
    />
    {children}
  </PluginHost>
);

Scheduler.propTypes = {
  data: PropTypes.array,
  currentDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  rootComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Scheduler.defaultProps = {
  children: undefined,
  data: [],
  currentDate: new Date(),
};
