import * as React from 'react';
import { mount } from 'enzyme';
import {
  testStatePluginField, executeComputedAction, pluginDepsToComponents, getComputedState,
} from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  addAppointment,
  cancelAddedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
} from '@devexpress/dx-scheduler-core';
import { EditingState } from './editing-state';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  startEditAppointment: jest.fn(),
  stopEditAppointment: jest.fn(),
  deleteAppointment: jest.fn(),
  cancelDeletedAppointment: jest.fn(),
  changeAppointment: jest.fn(),
  cancelChanges: jest.fn(),
  addAppointment: jest.fn(),
  cancelAddedAppointment: jest.fn(),
}));

const defaultDeps = {};
const defaultProps = {
  onCommitChanges: () => {},
};

describe('EditingState', () => {
  testStatePluginField({
    Plugin: EditingState,
    propertyName: 'editingAppointment',
    defaultDeps,
    defaultProps,
    values: [
      { a: 0 },
      { a: 1 },
      { a: 2 },
    ],
    actions: [{
      actionName: 'startEditAppointment',
      reducer: startEditAppointment,
    }, {
      actionName: 'stopEditAppointment',
      reducer: stopEditAppointment,
    }],
  });

  testStatePluginField({
    Plugin: EditingState,
    propertyName: 'appointmentChanges',
    defaultDeps,
    defaultProps,
    values: [
      { a: 0 },
      { a: 1 },
      { a: 2 },
    ],
    actions: [{
      actionName: 'changeAppointment',
      reducer: changeAppointment,
    }, {
      actionName: 'cancelChangedAppointment',
      reducer: cancelChanges,
    }],
  });

  testStatePluginField({
    Plugin: EditingState,
    propertyName: 'addedAppointment',
    defaultDeps,
    defaultProps,
    values: [
      { a: 0 },
      { a: 1 },
      { a: 2 },
    ],
    actions: [{
      actionName: 'addAppointment',
      reducer: addAppointment,
    }, {
      actionName: 'changeAddedAppointment',
      reducer: changeAppointment,
    }, {
      actionName: 'cancelAddedAppointment',
      reducer: cancelAddedAppointment,
    }],
  });
  it('should call preCommitChanges by commit if an appointment is recurrence', () => {
    const appointmentData = { rRule: 'rule' };
    const onCommitChanges = jest.fn();
    const preCommitChanges = jest.fn();

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <EditingState
          defaultEditingAppointment={appointmentData}
          onCommitChanges={onCommitChanges}
          preCommitChanges={preCommitChanges}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.commitChangedAppointment('type');
    });

    expect(onCommitChanges)
      .toBeCalledTimes(1);
    expect(preCommitChanges)
      .toBeCalledTimes(1);
    expect(preCommitChanges.mock.calls[0][0])
      .toEqual({});
    expect(preCommitChanges.mock.calls[0][1])
      .toEqual({ rRule: 'rule' });
    expect(preCommitChanges.mock.calls[0][2])
      .toEqual('type');
  });
  it('should not call preCommitChanges by commit if an appointment is not recurrence', () => {
    const appointmentData = { rRule: '' };
    const onCommitChanges = jest.fn();
    const preCommitChanges = jest.fn();

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <EditingState
          defaultEditingAppointment={appointmentData}
          onCommitChanges={onCommitChanges}
          preCommitChanges={preCommitChanges}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.commitChangedAppointment();
    });

    expect(onCommitChanges)
      .toBeCalledTimes(1);
    expect(preCommitChanges)
      .toBeCalledTimes(0);
  });
  it('should call preCommitChanges by delete', () => {
    const appointmentData = { rRule: 'rule' };
    const onCommitChanges = jest.fn();
    const preCommitChanges = jest.fn();

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <EditingState
          defaultEditingAppointment={appointmentData}
          onCommitChanges={onCommitChanges}
          preCommitChanges={preCommitChanges}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.commitDeletedAppointment({
        deletedAppointmentData: appointmentData,
        type: 'type',
      });
    });

    expect(onCommitChanges)
      .toBeCalledTimes(1);
    expect(preCommitChanges)
      .toBeCalledTimes(1);
    expect(preCommitChanges.mock.calls[0][0])
      .toEqual(null);
    expect(preCommitChanges.mock.calls[0][1])
      .toEqual({ rRule: 'rule' });
    expect(preCommitChanges.mock.calls[0][2])
      .toEqual('type');
  });
  it('should have editingAppointment prop equal to undefined', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <EditingState />
      </PluginHost>
    ));

    expect(getComputedState(tree).editingAppointment)
      .toBe(undefined);
  });
});
