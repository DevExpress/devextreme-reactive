import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { appointments, formatDateTimeGetter } from '@devexpress/dx-scheduler-core';
import { SchedulerProps } from '../types';
import { memoize } from '@devexpress/dx-core';

class SchedulerCoreBase extends React.PureComponent<SchedulerProps> {
  formatDateTimeGetter = memoize(locale => formatDateTimeGetter(locale));

  render() {
    const {
      data,
      rootComponent: Root,
      locale,
      height,
    } = this.props;

    return (
      <Plugin
        name="SchedulerCore"
      >
        <Getter name="appointments" value={appointments(data)} />
        <Getter name="formatDate" value={this.formatDateTimeGetter(locale)} />
        <Getter name="layoutHeight" value={height} />
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

/***
 * The Scheduler is a root container component designed to process
 * and display the specified data. The Scheduler's functionality
 * (data visualization and processing) is implemented in several plugins
 * specified as child components.
 * */
export const SchedulerCore: React.ComponentType<SchedulerProps> = SchedulerCoreBase;
