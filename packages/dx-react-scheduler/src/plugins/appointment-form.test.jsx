import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-react-core/test-utils';
import { AppointmentForm } from './appointment-form';

describe('AppointmentForm', () => {
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
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.popupComponent).exists())
      .toBeTruthy();
  });

  it('should provide toggleFormVisibility action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(AppointmentForm).instance().state.visible)
      .toEqual(undefined);
    executeComputedAction(tree, actions => actions.toggleFormVisibility());
    expect(tree.find(AppointmentForm).instance().state.visible)
      .toEqual(true);
  });

  it('should provide setAppointmentmeta action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(AppointmentForm).instance().state.appointment)
      .toEqual(undefined);
    executeComputedAction(
      tree, actions => actions.setFormAppointment({ appointment: { data: 1 } }),
    );
    expect(tree.find(AppointmentForm).instance().state.appointment)
      .toEqual({ data: 1 });
  });

  it('should render text editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.textEditorComponent).prop('label'))
      .toEqual('Title');
  });

  it('should render start date editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.dateEditorComponent).at(0).prop('label'))
      .toEqual('Start Date');
  });

  it('should render end date editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.dateEditorComponent).at(1).prop('label'))
      .toEqual('End Date');
  });

  it('should render all day editor', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.allDayEditorComponent).prop('text'))
      .toEqual('All Day');
  });

  it('should render cancel button', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.commandButtonComponent).at(0).prop('text'))
      .toEqual('Cancel');
  });

  it('should render commit button', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.commandButtonComponent).at(1).prop('text'))
      .toEqual('Save');
  });
});
