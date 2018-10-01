import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, testStatePluginField } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  addAppointment,
  changeAddedAppointment,
  cancelAddedAppointment,
  deleteAppointment,
  cancelDeletedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
  createAppointmentChangeGetter,
} from '@devexpress/dx-scheduler-core';
import { EditingState } from './editing-state';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  startEditAppointment: jest.fn(),
  stopEditAppointment: jest.fn(),
  deleteAppointment: jest.fn(),
  cancelDeletedAppointment: jest.fn(),
  createAppointmentChangeGetter: jest.fn(),
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
  it('should provide createAppointmentChange', () => {
    const createAppointmentChange = () => {};

    const tree = mount((
      <PluginHost>
        <EditingState
          {...defaultProps}
          createAppointmentChange={createAppointmentChange}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(createAppointmentChangeGetter)
      .toBeCalledWith(createAppointmentChange);
    expect(getComputedState(tree).createAppointmentChange)
      .toEqual(createAppointmentChangeGetter());
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
    propertyName: 'deletedAppointmentId',
    defaultDeps,
    defaultProps,
    values: [
      0,
      1,
      2,
    ],
    actions: [{
      actionName: 'deleteAppointment',
      reducer: deleteAppointment,
    }, {
      actionName: 'cancelDeletedAppointment',
      reducer: cancelDeletedAppointment,
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
