import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-testing';
import { AppointmentForm } from './appointment-form';

describe('AppointmentForm', () => {
  const defaultDeps = {
    template: {
      schedulerRoot: {},
    },
    getter: {
      appointmentChanges: jest.fn(),
      editingAppointment: { id: 10 },
      formatDate: jest.fn(),
    },
    action: {
      stopEditAppointment: jest.fn(),
      changeAppointment: jest.fn(),
      cancelChangedAppointment: jest.fn(),
      finishCommitAppointment: jest.fn(),
      finishDeleteAppointment: jest.fn(),
      changeAddedAppointment: jest.fn(),
      cancelAddedAppointment: jest.fn(),
      commitAddedAppointment: jest.fn(),
    },
  };

  const defaultProps = {
    /* eslint-disable react/prop-types */
    overlayComponent: ({ children }) => <div>{children}</div>,
    containerComponent: () => null,
    layoutComponent: ({
      basicLayoutComponent: BasicLayout,
      commandLayoutComponent: CommandLayout,
      recurrenceLayoutComponent: RecurrenceLayout,
     }) =>
      <div>
        <BasicLayout />
        <CommandLayout />
        <RecurrenceLayout />
      </div>,
    commandLayoutComponent: ({ children }) => <div>{children}</div>,
    basicLayoutComponent: ({ children }) => <div>{children}</div>,
    recurrenceLayoutComponent: ({ children }) => <div>{children}</div>,
    textEditorComponent: () => null,
    labelComponent: () => null,
    dateEditorComponent: () => null,
    commandButtonComponent: () => null,
    booleanEditorComponent: () => null,
    selectComponent: () => null,
    resourceEditorComponent: () => null,
    radioGroupComponent: () => null,
    weeklyRecurrenceSelectorComponent: () => null,
    appointmentData: {},
  };
  describe('Overlay', () => {
    it('should be rendered', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AppointmentForm
            {...defaultProps}
            visible
          />
        </PluginHost>
      ));

      const overlayComponent = tree.find(defaultProps.overlayComponent);
      expect(overlayComponent.exists())
        .toBeTruthy();
      expect(overlayComponent.prop('visible'))
        .toBeTruthy();
      expect(overlayComponent.prop('fullSize'))
        .toBeFalsy();
      expect(overlayComponent.prop('target'))
        .toBeDefined();
      expect(overlayComponent.prop('onHide'))
      .toEqual(expect.any(Function));
    });

    it('should be invisible', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AppointmentForm
            {...defaultProps}
            visible={false}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.overlayComponent).prop('visible'))
        .toBeFalsy();
    });

    it('should be fullSize', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AppointmentForm
            {...defaultProps}
            appointmentData={{ ...defaultProps.appointmentData, rRule: 'test rule' }}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.overlayComponent).prop('fullSize'))
        .toBeTruthy();
    });
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

  describe('Layout', () => {
    it('should be rendered', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AppointmentForm
            {...defaultProps}
          />
        </PluginHost>
      ));

      const layoutComponent = tree.find(defaultProps.layoutComponent);
      expect(layoutComponent.exists())
        .toBeTruthy();
      expect(layoutComponent.prop('isRecurrence'))
        .toBeFalsy();
    });

    it('should have recurrent part', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AppointmentForm
            {...defaultProps}
            appointmentData={{ ...defaultProps.appointmentData, rRule: 'test rule' }}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.layoutComponent).prop('isRecurrence'))
        .toBeTruthy();
    });
  });
  describe('CommandLayout', () => {
    it('should be rendered', () => {
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

      const commandLayoutComponent = tree.find(defaultProps.commandLayoutComponent);
      expect(commandLayoutComponent.exists())
        .toBeTruthy();
      expect(commandLayoutComponent.props())
        .toMatchObject({
          commandButtonComponent: defaultProps.commandButtonComponent,
          fullSize: false,
          getMessage: expect.any(Function),
          onCancelButtonClick: expect.any(Function),
          onCommitButtonClick: expect.any(Function),
          onDeleteButtonClick: expect.any(Function),
          readOnly: false,
          disableSaveButton: false,
          hideDeleteButton: false,
        });
    });

    it('should be full-size', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AppointmentForm
            {...defaultProps}
            appointmentData={{ ...defaultProps.appointmentData, rRule: 'test rule' }}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.commandLayoutComponent).prop('fullSize'))
        .toBeTruthy();
    });

    it('should hide delete button if a new appointment is being edited', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            getter: { ...defaultDeps.getter, editingAppointment: undefined },
          })}
          <AppointmentForm
            {...defaultProps}
          />
        </PluginHost>
      ));

      const templatePlaceholder = tree
        .find(Template)
        .filterWhere(node => node.props().name === 'commandLayout');

      const commandLayoutComponent = tree.find(defaultProps.commandLayoutComponent);
      expect(commandLayoutComponent.exists())
        .toBeTruthy();
      expect(commandLayoutComponent.props())
        .toMatchObject({
          commandButtonComponent: defaultProps.commandButtonComponent,
          fullSize: false,
          getMessage: expect.any(Function),
          onCancelButtonClick: expect.any(Function),
          onCommitButtonClick: expect.any(Function),
          onDeleteButtonClick: expect.any(Function),
          readOnly: false,
          disableSaveButton: false,
          hideDeleteButton: true,
        });
    });
  });

  it('should render BasicLayout', () => {
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

    const basicLayoutComponent = tree.find(defaultProps.basicLayoutComponent);
    expect(basicLayoutComponent.exists())
      .toBeTruthy();
    expect(basicLayoutComponent.props())
      .toMatchObject({
        getMessage: expect.any(Function),
        onFieldChange: expect.any(Function),
        selectComponent: defaultProps.selectComponent,
        textEditorComponent: defaultProps.textEditorComponent,
        dateEditorComponent: defaultProps.dateEditorComponent,
        labelComponent: defaultProps.labelComponent,
        booleanEditorComponent: defaultProps.booleanEditorComponent,
        resourceEditorComponent: defaultProps.resourceEditorComponent,
        readOnly: false,
        fullSize: true,
      });
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

    const recurrenceLayoutComponent = tree.find(defaultProps.recurrenceLayoutComponent);
    expect(recurrenceLayoutComponent.exists())
      .toBeTruthy();
    expect(recurrenceLayoutComponent.props())
      .toMatchObject({
        getMessage: expect.any(Function),
        formatDate: defaultDeps.getter.formatDate,
        onFieldChange: expect.any(Function),
        selectComponent: defaultProps.selectComponent,
        textEditorComponent: defaultProps.textEditorComponent,
        dateEditorComponent: defaultProps.dateEditorComponent,
        labelComponent: defaultProps.labelComponent,
        radioGroupComponent: defaultProps.radioGroupComponent,
        weeklyRecurrenceSelectorComponent: defaultProps.weeklyRecurrenceSelectorComponent,
        readOnly: false,
      });
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

  it('should provide toggleAppointmentFormVisibility action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, (computedActions) => {
      computedActions.toggleAppointmentFormVisibility();
    });

    expect(tree.find(AppointmentForm).state().visible)
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
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.commandLayoutComponent).props().onDeleteButtonClick();
    expect(openDeleteConfirmationDialog)
      .toBeCalled();
  });

  it('should call openCancelConfirmationDialog on delete event', () => {
    const openCancelConfirmationDialog = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          action: { ...defaultDeps.action, openCancelConfirmationDialog },
          getter: { ...defaultDeps.getter, appointmentChanges: { title: 'test' } },
        })}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.commandLayoutComponent).props().onCancelButtonClick();
    expect(openCancelConfirmationDialog)
      .toBeCalled();
  });

  it('should cancel a changed appointment correctly', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.commandLayoutComponent).props().onCancelButtonClick();
    expect(defaultDeps.action.cancelChangedAppointment)
      .toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .toBeCalled();
  });

  it('should cancel a new appointment correctly', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: { ...defaultDeps.getter, editingAppointment: undefined },
        })}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.commandLayoutComponent).props().onCancelButtonClick();
    expect(defaultDeps.action.cancelAddedAppointment)
      .toBeCalled();
  });

  it('should delete a changed appointment correctly', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.commandLayoutComponent).props().onDeleteButtonClick();
    expect(defaultDeps.action.cancelChangedAppointment)
      .toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .toBeCalled();
    expect(defaultDeps.action.finishDeleteAppointment)
      .toBeCalled();
  });

  it('should delete a new appointment correctly', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: { ...defaultDeps.getter, editingAppointment: undefined },
        })}
        <AppointmentForm
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.commandLayoutComponent).props().onDeleteButtonClick();
    expect(defaultDeps.action.cancelAddedAppointment)
      .toBeCalled();
    expect(defaultDeps.action.finishDeleteAppointment)
      .toBeCalled();
  });

  it('should call onHide correctly', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: { ...defaultDeps.getter, editingAppointment: undefined },
        })}
        <AppointmentForm
          {...defaultProps}
          visible
        />
      </PluginHost>
    ));

    tree.find(defaultProps.overlayComponent).props().onHide();
    expect(defaultDeps.action.cancelChangedAppointment)
      .toBeCalled();
    expect(defaultDeps.action.stopEditAppointment)
      .toBeCalled();
  });
});
