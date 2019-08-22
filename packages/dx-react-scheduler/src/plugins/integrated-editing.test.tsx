import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-testing';
import { IntegratedEditing } from './integrated-editing';

describe('IntegratedEditing', () => {
  const defaultDeps = {
    plugins: ['EditingState'],
    action: {
      commitChangedAppointment: jest.fn(),
      commitDeletedAppointment: jest.fn(),
    },
  };

  it('should provide finishCommitAppointment action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedEditing />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.finishCommitAppointment();
    });
    expect(defaultDeps.action.commitChangedAppointment)
      .toBeCalled();
  });
  it('should provide finishDeleteAppointment action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedEditing />
      </PluginHost>
    ));

    // open menu
    executeComputedAction(tree, (computedActions) => {
      computedActions.finishDeleteAppointment({ id: 3, rRule: 'rule' });
    });
    expect(defaultDeps.action.commitDeletedAppointment)
      .toBeCalled();
  });
});
