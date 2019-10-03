import * as React from 'react';
// tslint:disable-next-line: no-submodule-imports
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-testing';
import { ConfirmationDialog } from './confirmation-dialog';

describe('ConfirmationDialog', () => {
  const defaultDeps = {
    template: {
      schedulerRoot: {},
    },
    plugins: ['EditingState'],
    getter: {
      editingAppointment: {},
    },
    action: {
      toggleAppointmentFormVisibility: jest.fn(),
      toggleAppointmentTooltipVisibility: jest.fn(),
      stopEditAppointment: jest.fn(),
      finishDeleteAppointment: jest.fn(),
      cancelAddedAppointment: jest.fn(),
      cancelChangedAppointment: jest.fn(),
    },
  };
  const defaultProps = {
    layoutComponent: () => null,
    overlayComponent: ({ children }) => <div>{children}</div>,
    containerComponent: ({ children }) => <div>{children}</div>,
    buttonComponent: () => null,
  };
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render Layout component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    const layout = tree.find(defaultProps.layoutComponent);
    expect(layout.props())
      .toMatchObject({
        isDeleting: false,
        buttonComponent: defaultProps.buttonComponent,
        handleClose: expect.any(Function),
        confirm: expect.any(Function),
        getMessage: expect.any(Function),
      });
  });
  it('should render Overlay component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    const overlay = tree.find(defaultProps.overlayComponent);
    expect(overlay.props())
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
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    const container = tree.find(defaultProps.containerComponent);
    expect(container.exists())
      .toBeTruthy();
  });
  it('should provide openCancelConfirmationDialog action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(() => executeComputedAction(tree, (computedActions) => {
      computedActions.openCancelConfirmationDialog('appointmentForm');
    })).not.toThrow();
  });
  it('should provide openDeleteConfirmationDialog action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, { getter: {} })}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(() => executeComputedAction(tree, (computedActions) => {
      computedActions.openDeleteConfirmationDialog({
        caller: 'abc', appointmentData: { title: 'a' },
      });
    })).not.toThrow();
  });
  it('shouldn\'t provide openCancelConfirmationDialog action if doNotOpenOnCancel is true', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
          doNotOpenOnCancel
        />
      </PluginHost>
    ));

    expect(() => executeComputedAction(tree, (computedActions) => {
      computedActions.openCancelConfirmationDialog();
    })).toThrow();
  });
  it('shouldn\'t provide confirmCancelChanges action if doNotOpenOnDelete is true', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
          doNotOpenOnDelete
        />
      </PluginHost>
    ));

    expect(() => executeComputedAction(tree, (computedActions) => {
      computedActions.openDeleteConfirmationDialog();
    })).toThrow();
  });
  it('should confirm cancel action dispatched by the AppointmentForm and close it', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
          doNotOpenOnDelete
        />
      </PluginHost>
    ));

    // open the dialog
    executeComputedAction(tree, (computedActions) => {
      computedActions.openCancelConfirmationDialog('appointmentForm');
    });

    tree.update();
    act(() => {
      tree.find(defaultProps.layoutComponent).prop('confirm')();
    });

    expect(defaultDeps.action.toggleAppointmentFormVisibility)
      .toBeCalled();
    expect(defaultDeps.action.cancelChangedAppointment)
      .toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .toBeCalled();
  });
  it('should confirm cancel action dispatched by the AppointmentTooltip and close it', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
          doNotOpenOnDelete
        />
      </PluginHost>
    ));

    // open the dialog
    executeComputedAction(tree, (computedActions) => {
      computedActions.openCancelConfirmationDialog('appointmentTooltip');
    });

    tree.update();
    act(() => {
      tree.find(defaultProps.layoutComponent).prop('confirm')();
    });

    expect(defaultDeps.action.toggleAppointmentTooltipVisibility)
      .toBeCalled();
    expect(defaultDeps.action.cancelChangedAppointment)
      .toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .toBeCalled();
  });
  it('should confirm delete action dispatched by the AppointmentForm and close it', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    // open the dialog
    executeComputedAction(tree, (computedActions) => {
      computedActions.openDeleteConfirmationDialog({
        pluginName: 'appointmentForm', appointmentData: {},
      });
    });

    tree.update();

    act(() => {
      tree.find(defaultProps.layoutComponent).prop('confirm')();
    });

    expect(defaultDeps.action.toggleAppointmentFormVisibility)
      .toBeCalled();
    expect(defaultDeps.action.finishDeleteAppointment)
      .toBeCalled();
  });
  it('should confirm delete action dispatched by the AppointmentTooltip and close it', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    // open the dialog
    executeComputedAction(tree, (computedActions) => {
      computedActions.openDeleteConfirmationDialog({
        pluginName: 'appointmentTooltip', appointmentData: {},
      });
    });

    tree.update();

    act(() => {
      tree.find(defaultProps.layoutComponent).prop('confirm')();
    });

    expect(defaultDeps.action.toggleAppointmentTooltipVisibility)
      .toBeCalled();
    expect(defaultDeps.action.finishDeleteAppointment)
      .toBeCalled();

  });
  it('should cancel the cancel action dispatched by the AppointmentForm', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
          doNotOpenOnDelete
        />
      </PluginHost>
    ));

    // open the dialog
    executeComputedAction(tree, (computedActions) => {
      computedActions.openCancelConfirmationDialog('appointmentForm');
    });

    tree.update();
    act(() => {
      tree.find(defaultProps.layoutComponent).prop('handleClose')();
    });

    expect(defaultDeps.action.toggleAppointmentFormVisibility)
      .not.toBeCalled();
    expect(defaultDeps.action.cancelChangedAppointment)
      .not.toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .not.toBeCalled();
  });
  it('should cancel the cancel action dispatched by the AppointmentTooltip', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
          doNotOpenOnDelete
        />
      </PluginHost>
    ));

    // open the dialog
    executeComputedAction(tree, (computedActions) => {
      computedActions.openCancelConfirmationDialog('appointmentTooltip');
    });

    tree.update();
    act(() => {
      tree.find(defaultProps.layoutComponent).prop('handleClose')();
    });

    expect(defaultDeps.action.toggleAppointmentTooltipVisibility)
      .not.toBeCalled();
    expect(defaultDeps.action.cancelChangedAppointment)
      .not.toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .not.toBeCalled();
  });
  it('should csncel the delete action dispatched by the AppointmentForm', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.openDeleteConfirmationDialog({
        pluginName: 'appointmentForm', appointmentData: {},
      });
    });

    tree.update();
    act(() => {
      tree.find(defaultProps.layoutComponent).prop('handleClose')();
    });

    expect(defaultDeps.action.toggleAppointmentFormVisibility)
      .not.toBeCalled();
    expect(defaultDeps.action.finishDeleteAppointment)
      .not.toBeCalled();
  });
  it('should cancel the delete action dispatched by the AppointmentTooltip', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.openDeleteConfirmationDialog({
        pluginName: 'appointmentTooltip', appointmentData: {},
      });
    });

    tree.update();
    act(() => {
      tree.find(defaultProps.layoutComponent).prop('handleClose')();
    });

    expect(defaultDeps.action.toggleAppointmentTooltipVisibility)
      .not.toBeCalled();
    expect(defaultDeps.action.finishDeleteAppointment)
      .not.toBeCalled();
  });
  it('should correctly cancel a new appointment and close AppointmentForm', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: { ...defaultDeps.getter, editingAppointment: undefined },
        })}
        <ConfirmationDialog
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.openCancelConfirmationDialog('appointmentForm');
    });

    tree.update();
    act(() => {
      tree.find(defaultProps.layoutComponent).prop('confirm')();
    });

    expect(defaultDeps.action.toggleAppointmentFormVisibility)
      .toBeCalled();
    expect(defaultDeps.action.cancelAddedAppointment)
      .toBeCalled();
  });
});
