import * as React from 'react';
import { PluginHost } from '@devexpress/dx-react-core';
import { SchedulerCore } from './plugins/scheduler-core';
import { SchedulerProps } from './types';

export const Scheduler: React.SFC<SchedulerProps> = ({
  data,
  rootComponent,
  children,
}) => (
  <PluginHost>
    <SchedulerCore
      data={data}
      rootComponent={rootComponent}
    />
    {children}
  </PluginHost>
);
