import * as React from 'react';
import { Action, Plugin, Actions } from '@devexpress/dx-react-core';
import { IntegratedEditingProps } from '../types';

const pluginDependencies = [
  { name: 'EditingState' },
];

class IntegratedEditingBase extends React.PureComponent<IntegratedEditingProps> {
  static defaultProps = {
    totalCount: 0,
  };

  finishCommitAppointment = (payload, getters, { commitChangedAppointment }: Actions) => {
    commitChangedAppointment();
  }

  finishDeleteAppointment = (payload, getters, { commitDeletedAppointment }: Actions) => {
    commitDeletedAppointment({ deletedAppointmentData: payload });
  }

  render() {
    return (
      <Plugin
        name="IntegratedEditing"
        dependencies={pluginDependencies}
      >
        <Action name="finishCommitAppointment" action={this.finishCommitAppointment} />
        <Action name="finishDeleteAppointment" action={this.finishDeleteAppointment} />
      </Plugin>
    );
  }
}

/** A plugin that allows implementing a editing calculation logic. */
export const IntegratedEditing: React.ComponentType<IntegratedEditingProps> = IntegratedEditingBase;
