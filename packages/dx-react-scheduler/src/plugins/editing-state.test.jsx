import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-react-core/test-utils';
import { EditingState } from './editing-state';

describe('EditingState', () => {
  const defaultProps = {
    onCommitChanges: jest.fn(),
  };

  it('should provide deleteAppointment action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <EditingState
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, actions => actions.deleteAppointment(10));
    expect(defaultProps.onCommitChanges)
      .toBeCalledWith({ deleted: 10 });
  });

  it('should provide addAppointment action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <EditingState
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, actions => actions.addAppointment({ startDate: '1', endDate: '2', title: '3' }));
    expect(defaultProps.onCommitChanges)
      .toBeCalledWith({ added: { startDate: '1', endDate: '2', title: '3' } });
  });
});
