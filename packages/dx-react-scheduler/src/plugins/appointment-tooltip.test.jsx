import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-react-core/test-utils';
import { setAppointmentMeta } from '@devexpress/dx-scheduler-core';
import { AppointmentTooltip } from './appointment-tooltip';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  setAppointmentMeta: jest.fn(),
}));

describe('AppointmentTooltip', () => {
  const defaultDeps = {
    getter: {
      getAppointmentEndDate: jest.fn(),
      getAppointmentStartDate: jest.fn(),
      getAppointmentTitle: jest.fn(),
    },
    template: {
      main: {},
    },
    plugins: ['Appointments'],
  };
  const defaultProps = {
    layoutComponent: () => <div />,
    headComponent: () => null,
    contentComponent: () => null,
    commandButtonComponent: () => null,
  };

  beforeEach(() => {
    setAppointmentMeta.mockImplementation(() => undefined);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render Layout component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.layoutComponent).exists())
      .toBeTruthy();
  });

  it('should provide setTooltipAppointmentMeta action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, actions => actions.setTooltipAppointmentMeta());
    expect(setAppointmentMeta)
      .toBeCalled();
  });

  it('should provide toggleTooltipVisibility action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(AppointmentTooltip).instance().state.visible)
      .toEqual(undefined);
    executeComputedAction(tree, actions => actions.toggleTooltipVisibility());
    expect(tree.find(AppointmentTooltip).instance().state.visible)
      .toEqual(true);
  });
});
