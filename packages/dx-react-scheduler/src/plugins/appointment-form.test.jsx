import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import {
  COMMIT_COMMAND_BUTTON,
  CANCEL_COMMAND_BUTTON,
} from '@devexpress/dx-scheduler-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { AppointmentForm } from './appointment-form';

describe('AppointmentForm', () => {
  const defaultDeps = {
    template: {
      main: {},
    },
    getter: {
      getAppointmentTitle: jest.fn(),
      getAppointmentStartDate: jest.fn(),
      getAppointmentEndDate: jest.fn(),
      getAppointmentAllDay: jest.fn(),
      getAppointmentId: jest.fn(),
      setAppointmentTitle: jest.fn(),
      setAppointmentStartDate: jest.fn(),
      setAppointmentEndDate: jest.fn(),
      setAppointmentAllDay: jest.fn(),
      appointmentChanges: jest.fn(),
    },
    action: {
      stopEditAppointment: jest.fn(),
      changeAppointment: jest.fn(),
      cancelChangedAppointment: jest.fn(),
      commitChangedAppointment: jest.fn(),
    },
  };

  const defaultProps = {
    /* eslint-disable react/prop-types */
    popupComponent: ({ children }) => <div>{children}</div>,
    containerComponent: ({ children }) => <div>{children}</div>,
    scrollableSpaceContainer: ({ children }) => <div>{children}</div>,
    staticSpaceContainer: ({ children }) => <div>{children}</div>,
    dateEditorComponent: () => null,
    textEditorComponent: () => null,
    commandButtonComponent: () => null,
    allDayEditorComponent: () => null,
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

  it('should render text editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const textEditor = tree.find(defaultProps.textEditorComponent);
    expect(textEditor.prop('label'))
      .toEqual('Title');

    textEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
    expect(defaultDeps.getter.setAppointmentTitle)
      .toBeCalled();
  });

  it('should render start date editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    const startDateEditor = tree
      .find(defaultProps.dateEditorComponent)
      .filterWhere(node => node.props().label === 'Start Date');

    startDateEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
    expect(defaultDeps.getter.setAppointmentStartDate)
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
      .find(defaultProps.dateEditorComponent)
      .filterWhere(node => node.props().label === 'End Date');

    endDateEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
    expect(defaultDeps.getter.setAppointmentEndDate)
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

    const AllDayEditor = tree
      .find(defaultProps.allDayEditorComponent);

    expect(AllDayEditor.prop('text'))
      .toEqual('All Day');

    AllDayEditor.prop('onValueChange')();
    expect(defaultDeps.action.changeAppointment)
      .toBeCalled();
    expect(defaultDeps.getter.setAppointmentAllDay)
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
    expect(defaultDeps.getter.getAppointmentId)
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
