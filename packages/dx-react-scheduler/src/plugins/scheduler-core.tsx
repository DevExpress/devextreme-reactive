import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { appointments } from '@devexpress/dx-scheduler-core';
import { SchedulerProps } from '../types';

class SchedulerCoreBase extends React.PureComponent<SchedulerProps> {
  render() {
    const {
      data,
      rootComponent: Root,
    } = this.props;

    return (
      <Plugin
        name="SchedulerCore"
      >
        <Getter name="appointments" value={appointments(data)} />
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

export const SchedulerCore: React.ComponentType<SchedulerProps> = SchedulerCoreBase;
