import * as React from 'react';
import { PluginHost } from '@devexpress/dx-react-core';
import { SchedulerCore } from './plugins/scheduler-core';
import { SchedulerProps } from './types';

const SchedulerBase: React.SFC<SchedulerProps> = ({
  data,
  rootComponent,
  children,
  locale,
}) => (
  <PluginHost>
    <SchedulerCore
      data={data}
      rootComponent={rootComponent}
      locale={locale}
    />
    {children}
  </PluginHost>
);

SchedulerBase.defaultProps = {
  data: [],
  locale: 'en-US'
};

/** The Scheduler is a root container component designed to process
 * and display the specified data. The Scheduler’s functionality
 * (data visualization and processing) is implemented in several plugins specified as child components.
 * */
export const Grid: React.ComponentType<SchedulerProps> = SchedulerBase;
