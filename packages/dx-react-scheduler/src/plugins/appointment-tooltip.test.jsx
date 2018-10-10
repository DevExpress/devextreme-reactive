import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
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

  it('should render appointment template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'appointment')
      .props().children();

    expect(templatePlaceholder.props.params.onClick)
      .toEqual(expect.any(Function));
  });

  it('should pass onDeleteButtonClick function', () => {
    const deps = {
      action: {
        commitDeletedAppointment: jest.fn(),
      },
      getter: {
        getAppointmentId: jest.fn(),
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <AppointmentTooltip
          {...defaultProps}
          appointmentMeta={{ appointment: {} }}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find('TemplatePlaceholder')
      .filterWhere(node => node.props().name === 'tooltip');

    expect(templatePlaceholder.props().params.onDeleteButtonClick)
      .toEqual(expect.any(Function));

    templatePlaceholder.props().params.onDeleteButtonClick();
    expect(deps.action.commitDeletedAppointment)
      .toBeCalled();
  });
});
