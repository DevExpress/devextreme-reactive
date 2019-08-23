import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { AppointmentForm } from './appointment-form';

describe('AppointmentForm', () => {
  const defaultDeps = {
    template: {
      schedulerRoot: {},
    },
    getter: {
      appointmentChanges: jest.fn(),
      editingAppointment: { id: 10 },
    },
    action: {
      stopEditAppointment: jest.fn(),
      changeAppointment: jest.fn(),
      cancelChangedAppointment: jest.fn(),
      finishCommitAppointment: jest.fn(),
      changeAddedAppointment: jest.fn(),
      cancelAddedAppointment: jest.fn(),
      commitAddedAppointment: jest.fn(),
    },
  };

  const defaultProps = {
    /* eslint-disable react/prop-types */
    overlayComponent: ({ children }) => <div>{children}</div>,
    containerComponent: () => null,
    layoutComponent: ({ children }) => <div>{children}</div>,
    commandLayoutComponent: ({ children }) => <div>{children}</div>,
    basicLayoutComponent: ({ children }) => <div>{children}</div>,
    recurrenceLayoutComponent: ({ children }) => <div>{children}</div>,
    textEditorComponent: () => null,
    labelComponent: () => null,
    dateEditorComponent: () => null,
    commandButtonComponent: () => null,
    booleanEditorComponent: () => null,
    selectComponent: () => null,
    radioGroupComponent: () => null,
    buttonGroupComponent: () => null,
    appointmentData: {},
  };

  it('should render Overlay component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.overlayComponent).exists())
      .toBeTruthy();
  });

  it('should render Container component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.containerComponent).exists())
      .toBeTruthy();
  });

  it('should render Layout component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.layoutComponent).exists())
      .toBeTruthy();
  });

  it('should render CommandLayout template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'commandLayout');

    expect(templatePlaceholder.exists())
      .toBeTruthy();
  });

  it('should render BasicLayout template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'basicLayout');

    expect(templatePlaceholder.exists())
      .toBeTruthy();
  });

  it('should render RecurrenceLayout template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'recurrenceLayout');

    expect(templatePlaceholder.exists())
      .toBeTruthy();
  });

  it('should render appointment template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'appointment');

    expect(templatePlaceholder.exists())
      .toBeTruthy();
  });

  it('should render tooltip template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'tooltip');

    expect(templatePlaceholder.exists())
      .toBeTruthy();
  });
});
