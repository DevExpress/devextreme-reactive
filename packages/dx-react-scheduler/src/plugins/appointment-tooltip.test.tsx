import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-testing';
import { setAppointmentMeta, TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY } from '@devexpress/dx-scheduler-core';
import { AppointmentTooltip } from './appointment-tooltip';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  setAppointmentMeta: jest.fn(),
}));

describe('AppointmentTooltip', () => {
  const defaultDeps = {
    template: {
      timeTable: {},
      appointment: {},
    },
    plugins: ['Appointments'],
    getter: {
      formatDate: () => undefined,
    },
    action: {
      finishDeleteAppointment: jest.fn(),
    },
  };
  const defaultProps = {
    layoutComponent: () => <div />,
    headerComponent: () => null,
    contentComponent: () => null,
    commandButtonComponent: () => null,
    appointmentMeta: {
      data: {
        id: 1,
      },
      target: {},
    },
  };

  beforeEach(() => {
    setAppointmentMeta.mockImplementation(() => undefined);
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
        finishDeleteAppointment: jest.fn(),
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <AppointmentTooltip
          {...defaultProps}
          appointmentMeta={{ data: {} }}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find('TemplatePlaceholderBase')
      .filterWhere(node => node.props().name === 'tooltip').last();

    expect(templatePlaceholder.props().params.onDeleteButtonClick)
      .toEqual(expect.any(Function));
    expect(templatePlaceholder.props().params.formatDate)
      .toEqual(expect.any(Function));

    templatePlaceholder.props().params.onDeleteButtonClick();
    expect(deps.action.finishDeleteAppointment)
      .toBeCalled();
  });

  it('should pass onClick to appointment template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    const appointmentTemplate = tree
      .find('TemplateBase')
      .filterWhere(node => node.props().name === 'appointment').last();

    expect(appointmentTemplate.props().children().props.params.onClick)
      .toEqual(expect.any(Function));

    appointmentTemplate.props().children().props.params.onClick({
      target: 'target',
      data: 'data',
    });
    expect(setAppointmentMeta)
      .toBeCalled();
  });

  it('should provide toggleAppointmentTooltipVisibility action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.toggleAppointmentTooltipVisibility();
    });

    expect(tree.find(AppointmentTooltip).state().visible)
      .toBeTruthy();
  });

  it('should call openDeleteConfirmationDialog on delete event', () => {
    const openDeleteConfirmationDialog = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          action: { ...defaultDeps.action, openDeleteConfirmationDialog },
        })}
        <AppointmentTooltip
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find('TemplatePlaceholderBase')
      .filterWhere(node => node.props().name === 'tooltip').last();

    templatePlaceholder.props().params.onDeleteButtonClick();
    expect(openDeleteConfirmationDialog)
      .toBeCalled();
  });
});
