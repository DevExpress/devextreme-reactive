import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';
import { appointments, formatDateTimeGetter } from '@devexpress/dx-scheduler-core';
import { SchedulerProps } from '../types';

class SchedulerCoreBase extends React.PureComponent<SchedulerProps> {
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
        <Getter name="formatDate" value={formatDateTimeGetter(locale)} />
        <Getter name="layoutHeight" value={height} />
        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>

        <Template name="footer">
          <TemplateConnector>
            {(getters, actions) => {
              if (getters.isDialogOpen) {
                return (
                  <React.Fragment>
                    <TemplatePlaceholder />
                    <div>
                      123
                      <button onClick={() => getters.preCommitChanges('all')}>
                        Commit Changes
                      </button>
                      <button onClick={actions.toggleEditDialog}>
                        close
                      </button>
                    </div>
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment>
                <TemplatePlaceholder />
                  <button onClick={actions.toggleEditDialog}>
                    open
                  </button>
                </React.Fragment>
              )}}
          </TemplateConnector>
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
