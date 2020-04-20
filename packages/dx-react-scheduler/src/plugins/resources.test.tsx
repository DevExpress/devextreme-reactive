import * as React from 'react';
import {
  pluginDepsToComponents, getComputedState, setupConsole,
} from '@devexpress/dx-testing';
import {
  convertResourcesToPlain, validateResources, addResourcesToAppointments,
} from '@devexpress/dx-scheduler-core';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { Resources } from './resources';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  convertResourcesToPlain: jest.fn(),
  validateResources: jest.fn(),
  addResourcesToAppointments: jest.fn(),
}));

const defaultDeps = {
  getter: {
    appointments: [],
    timeTableAppointments: ['test'],
    allDayAppointments: ['test'],
  },
  template: {
    appointment: {},
  },
  plugins: ['Appointments'],
};

describe('Resources', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });
  beforeEach(() => {
    validateResources.mockImplementation(() => 'validResources');
    convertResourcesToPlain.mockImplementation(() => 'plainResources');
    addResourcesToAppointments.mockImplementation(() => 'appointments');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide the "resources" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Resources
          data={[]}
        />
      </PluginHost>
    ));

    expect(validateResources)
      .toBeCalledWith([], undefined, undefined);
    expect(getComputedState(tree).resources)
      .toBe('validResources');
  });
  it('should provide the "plainResources" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Resources
          data={[]}
        />
      </PluginHost>
    ));

    expect(convertResourcesToPlain)
      .toBeCalledWith('validResources');
    expect(getComputedState(tree).plainResources)
      .toBe('plainResources');
  });
  it('should provide the "timeTableAppointments" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Resources
          data={[]}
        />
      </PluginHost>
    ));

    expect(addResourcesToAppointments)
      .toBeCalledWith('test', 'validResources', 'plainResources');
    expect(getComputedState(tree).timeTableAppointments)
      .toBe('appointments');
  });
  it('should provide the "allDayAppointments" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Resources
          data={[]}
        />
      </PluginHost>
    ));

    expect(addResourcesToAppointments)
      .toBeCalledWith('test', 'validResources', 'plainResources');
    expect(getComputedState(tree).allDayAppointments)
      .toBe('appointments');
  });
});
