import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import {
  COMMIT_COMMAND_BUTTON,
  CANCEL_COMMAND_BUTTON,
} from '@devexpress/dx-scheduler-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { AppointmentForm } from './appointment-form';

describe('AppointmentForm', () => {
  const defaultDeps = {
    template: {
      main: {},
    },
    getter: {
      appointmentChanges: jest.fn(),
      editingAppointmentId: 10,
    },
    action: {
      stopEditAppointment: jest.fn(),
      changeAppointment: jest.fn(),
      cancelChangedAppointment: jest.fn(),
      commitChangedAppointment: jest.fn(),
      changeAddedAppointment: jest.fn(),
      cancelAddedAppointment: jest.fn(),
      commitAddedAppointment: jest.fn(),
    },
  };

  const defaultProps = {
    /* eslint-disable react/prop-types */
    popupComponent: ({ children }) => <div>{children}</div>,
    containerComponent: ({ children }) => <div>{children}</div>,
    scrollableAreaComponent: ({ children }) => <div>{children}</div>,
    staticAreaComponent: ({ children }) => <div>{children}</div>,
    startDateComponent: () => null,
    endDateComponent: () => null,
    titleComponent: () => null,
    commandButtonComponent: () => null,
    allDayComponent: () => null,
    appointmentData: {
      title: undefined,
      startDate: undefined,
      endDate: undefined,
      allDay: undefined,
    },
  };

  it('should render Popup component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.popupComponent).exists())
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

  it('should render title editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const textEditor = tree.find(defaultProps.titleComponent);
    expect(textEditor.prop('label'))
      .toEqual('Title');

    textEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
  });

  it('should render startDate date editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const startDateEditor = tree
      .find(defaultProps.startDateComponent)
      .filterWhere(node => node.props().label === 'Start Date');

    startDateEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
  });

  it('should render end date editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const endDateEditor = tree
      .find(defaultProps.endDateComponent)
      .filterWhere(node => node.props().label === 'End Date');

    endDateEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
  });

  it('should render all day editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const allDayEditor = tree
      .find(defaultProps.allDayComponent);

    expect(allDayEditor.prop('text'))
      .toEqual('All Day');

    allDayEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
  });

  it('should render commit button', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const commitButton = tree
      .find(defaultProps.commandButtonComponent)
      .filterWhere(node => node.props().id === COMMIT_COMMAND_BUTTON);

    expect(commitButton.prop('text'))
      .toEqual('Save');

    commitButton.prop('onExecute')();
    expect(defaultDeps.action.commitChangedAppointment)
      .toBeCalled();
  });

  it('should render cancel button', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const cancelButton = tree
      .find(defaultProps.commandButtonComponent)
      .filterWhere(node => node.props().id === CANCEL_COMMAND_BUTTON);

    expect(cancelButton.prop('text'))
      .toEqual('Cancel');

    cancelButton.prop('onExecute')();
    expect(defaultDeps.action.stopEditAppointment)
      .toBeCalled();
    expect(defaultDeps.action.cancelChangedAppointment)
      .toBeCalled();
  });

  it('should not render commit button in readOnly mode', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
          readOnly
        />
      </PluginHost>
    ));

    const commitButton = tree
      .find(defaultProps.commandButtonComponent)
      .filterWhere(node => node.props().id === COMMIT_COMMAND_BUTTON);
    const cancelButton = tree
      .find(defaultProps.commandButtonComponent)
      .filterWhere(node => node.props().id === CANCEL_COMMAND_BUTTON);

    expect(commitButton.exists())
      .toBeFalsy();
    expect(cancelButton.exists())
      .toBeTruthy();
  });
});
