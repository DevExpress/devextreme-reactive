import * as React from 'react';
import {
  testStatePluginField, pluginDepsToComponents, getComputedState, setupConsole,
} from '@devexpress/dx-testing';
import { convertResourcesToPlain, validateResources, getAppointmentResources } from '@devexpress/dx-scheduler-core';
import { mount } from 'enzyme';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { Resources } from './resources';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  convertResourcesToPlain: jest.fn(),
  validateResources: jest.fn(),
  getAppointmentResources: jest.fn(),
}));

const defaultDeps = {
  getter: {
    appointments: [],
  },
  template: {
    appointment: {},
  },
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
    getAppointmentResources.mockImplementation(() => 'appointmentResources');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide the "resources" getter', () => {
    const tree = mount((
      <PluginHost>
        <Resources
          data={[]}
        />
        {pluginDepsToComponents(defaultDeps)}
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
        <Resources
          data={[]}
        />
        {pluginDepsToComponents(defaultDeps)}
      </PluginHost>
    ));

    expect(convertResourcesToPlain)
      .toBeCalledWith('validResources');
    expect(getComputedState(tree).plainResources)
      .toBe('plainResources');
  });
  it('should render appointment content template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Resources
          data={[]}
        />
      </PluginHost>
    ));

    const appointment = tree.find(TemplatePlaceholder).at(3);
    expect(appointment.props().params.resources).toBe('appointmentResources');
  });
});
