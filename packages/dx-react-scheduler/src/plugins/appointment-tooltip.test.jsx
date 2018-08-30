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
    plugins: ['Appointment'],
  };
  const defaultProps = {
    tooltipComponent: () => <div />,
    headComponent: () => null,
    contentComponent: () => null,
    openButtonComponent: () => null,
    deleteButtonComponent: () => null,
    closeButtonComponent: () => null,
  };

  beforeEach(() => {
    setAppointmentMeta.mockImplementation(() => undefined);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render tooltip', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.tooltipComponent).exists())
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

  it('should provide toggleTooltipVisible action', () => {
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
    executeComputedAction(tree, actions => actions.toggleTooltipVisible());
    expect(tree.find(AppointmentTooltip).instance().state.visible)
      .toEqual(true);
  });
});
