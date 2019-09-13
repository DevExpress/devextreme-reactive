import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-testing';
import { EditRecurrenceMenu } from './edit-recurrence-menu';

describe('EditRecurrenceMenu', () => {
  const defaultDeps = {
    template: {
      schedulerRoot: {},
    },
    plugins: ['EditingState'],
    getter: {
      editingAppointment: { rRule: 'rule' },
    },
    action: {
      commitChangedAppointment: jest.fn(),
      commitDeletedAppointment: jest.fn(),
      cancelChangedAppointment: jest.fn(),
      stopEditAppointment: jest.fn(),
    },
  };
  const defaultProps = {
    layoutComponent: () => null,
    overlayComponent: ({ children }) => <div>{children}</div>,
    containerComponent: ({ children }) => <div>{children}</div>,
    buttonComponent: () => null,
  };

  it('should render Layout component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    const layout = tree.find(defaultProps.layoutComponent);
    expect(layout.props())
      .toEqual({
        isDeleting: false,
        buttonComponent: defaultProps.buttonComponent,
        handleClose: expect.any(Function),
        commit: expect.any(Function),
        availableOperations: expect.any(Array),
        getMessage: expect.any(Function),
      });
  });
  it('should render Modal component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    const modal = tree.find(defaultProps.overlayComponent);
    expect(modal.props())
      .toEqual({
        target: expect.any(Object),
        visible: false,
        onHide: expect.any(Function),
        children: expect.any(Object),
      });
  });
  it('should render Container component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    const container = tree.find(defaultProps.containerComponent);
    expect(container.exists())
      .toBeTruthy();
  });
  it('should provide finishCommitAppointment action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    // open menu
    executeComputedAction(tree, (computedActions) => {
      computedActions.finishCommitAppointment();
    });
    expect(defaultDeps.action.commitChangedAppointment)
      .not.toBeCalled();
    tree.update();
    const layout = tree.find(defaultProps.layoutComponent);
    // commit changes
    layout.props().commit();

    expect(defaultDeps.action.commitChangedAppointment)
      .toBeCalled();
  });
  it('should not open menu if appointment is not recurrence by finishCommitAppointment', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, { getter: {} })}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.finishCommitAppointment();
    });

    expect(defaultDeps.action.commitChangedAppointment)
      .toBeCalled();
  });
  it('should provide finishDeleteAppointment action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    // open menu
    executeComputedAction(tree, (computedActions) => {
      computedActions.finishDeleteAppointment({ id: 3, rRule: 'rule' });
    });
    tree.update();
    const layout = tree.find(defaultProps.layoutComponent);
    // commit changes
    layout.props().commit();

    expect(defaultDeps.action.commitDeletedAppointment)
      .toBeCalled();
  });
  it('should not open menu if appointment is not recurrence by finishDeleteAppointment', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, { getter: {} })}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.finishDeleteAppointment({ id: 3 });
    });

    expect(defaultDeps.action.commitDeletedAppointment)
      .toBeCalled();
  });
  it('should cancel appointment editing', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, { getter: {} })}
        <EditRecurrenceMenu
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.layoutComponent).prop('handleClose')();

    expect(defaultDeps.action.cancelChangedAppointment)
      .toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .toBeCalled();
  });
});
