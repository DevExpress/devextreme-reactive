import * as React from 'react';
import { PluginHost } from '@devexpress/dx-react-core';
import { SchedulerCore } from './plugins/scheduler-core';
import { SchedulerProps } from './types';

const SchedulerBase: React.FunctionComponent<SchedulerProps> = ({
  data,
  rootComponent,
  children,
  locale,
  height,
  firstDayOfWeek,
}) => (
  <PluginHost>
    <SchedulerCore
      data={data}
      rootComponent={rootComponent}
      locale={locale}
      height={height}
      firstDayOfWeek={firstDayOfWeek}
    />
    {children}
  </PluginHost>
);

SchedulerBase.defaultProps = {
  data: [],
  locale: 'en-US',
  height: 'auto',
  firstDayOfWeek: 0,
};

// tslint:disable: max-line-length
/***
 * The Scheduler is a root container component designed to process
 * and display the specified data. The Scheduler’s functionality
 * (data visualization and processing) is implemented in several plugins specified as child components.
 * */
export const Scheduler: React.ComponentType<SchedulerProps> = SchedulerBase;
