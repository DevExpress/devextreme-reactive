import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, testStatePluginField } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  addAppointment,
  changeAddedAppointment,
  cancelAddedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
} from '@devexpress/dx-scheduler-core';
import { EditingState } from './editing-state';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  startEditAppointment: jest.fn(),
  stopEditAppointment: jest.fn(),
  deleteAppointment: jest.fn(),
  cancelDeletedAppointment: jest.fn(),
  changeAppointment: jest.fn(),
  cancelChanges: jest.fn(),
  addAppointment: jest.fn(),
  changeAddedAppointment: jest.fn(),
  cancelAddedAppointment: jest.fn(),
}));

const defaultDeps = {};
const defaultProps = {
  onCommitChanges: () => {},
};

describe('EditingState', () => {
  it('should provide setAppointmentTitle getter', () => {
    const setAppointmentTitle = jest.fn();

    const tree = mount((
      <PluginHost>
        <EditingState
          {...defaultProps}
          setAppointmentTitle={setAppointmentTitle}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).setAppointmentTitle)
      .toBe(setAppointmentTitle);
  });

  it('should provide setAppointmentStartDate getter', () => {
    const setAppointmentStartDate = jest.fn();

    const tree = mount((
      <PluginHost>
        <EditingState
          {...defaultProps}
          setAppointmentStartDate={setAppointmentStartDate}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).setAppointmentStartDate)
      .toBe(setAppointmentStartDate);
  });

  it('should provide setAppointmentEndDate getter', () => {
    const setAppointmentEndDate = jest.fn();

    const tree = mount((
      <PluginHost>
        <EditingState
          {...defaultProps}
          setAppointmentEndDate={setAppointmentEndDate}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).setAppointmentEndDate)
      .toBe(setAppointmentEndDate);
  });

  it('should provide setAppointmentAllDay getter', () => {
    const setAppointmentAllDay = jest.fn();

    const tree = mount((
      <PluginHost>
        <EditingState
          {...defaultProps}
          setAppointmentAllDay={setAppointmentAllDay}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).setAppointmentAllDay)
      .toBe(setAppointmentAllDay);
  });

  testStatePluginField({
    Plugin: EditingState,
    propertyName: 'editingAppointmentId',
    defaultDeps,
    defaultProps,
    values: [
      0,
      1,
      2,
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
      reducer: changeAddedAppointment,
    }, {
      actionName: 'cancelAddedAppointment',
      reducer: cancelAddedAppointment,
    }],
  });
});
