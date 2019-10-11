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
      formatDate: jest.fn(),
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
});
