import { testStatePluginField } from '@devexpress/dx-testing';
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
  ...require.requireActual('@devexpress/dx-scheduler-core'),
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
      reducer: changeAppointment,
    }, {
      actionName: 'cancelAddedAppointment',
      reducer: cancelAddedAppointment,
    }],
  });
});
