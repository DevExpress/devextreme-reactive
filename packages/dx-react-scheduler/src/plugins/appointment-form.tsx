import * as React from 'react';
import { getMessagesFormatter, memoize } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  createStateHelper,
  StateHelper,
  TemplateConnector,
  TemplatePlaceholder,
  PluginComponents,
  Action,
} from '@devexpress/dx-react-core';
import {
  setAppointmentData,
  isAllDayCell,
  callActionIfExists,
  AppointmentModel,
  TOGGLE_APPOINTMENT_FORM_VISIBILITY,
  getAppointmentResources,
  ValidResourceInstance,
  checkMultipleResourceFields,
} from '@devexpress/dx-scheduler-core';

import {
  AppointmentFormProps, AppointmentFormState, AppointmentTooltip, Appointments,
} from '../types';

const addDoubleClickToCell = (
  title, startDate, endDate, groupingInfo, resources,
  allDay, openFormHandler, addAppointment, params,
) => {
  const resourceFields = !!groupingInfo
    ? groupingInfo.reduce((acc, currentGroup) => (
      { ...acc, [currentGroup.fieldName]: currentGroup.id }
    ), {}) : {};
  const validResourceFields = resources
    ? checkMultipleResourceFields(resourceFields, resources)
    : resourceFields;

  const newAppointmentData = {
    title,
    startDate,
    endDate,
    allDay,
    ...validResourceFields,
  };

  return (
    <TemplatePlaceholder
      params={{
        ...params,
        onDoubleClick: () => {
          openFormHandler(newAppointmentData);
          callActionIfExists(addAppointment,
            { appointmentData: newAppointmentData });
        },
      }}
    />
  );
};

const defaultMessages = {
  allDayLabel: 'All Day',
  titleLabel: 'Title',
  commitCommand: 'Save',
  detailsLabel: 'Details',
  moreInformationLabel: 'More Information',
  repeatLabel: 'Repeat',
  notesLabel: 'Notes',
  never: 'Never',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
  repeatEveryLabel: 'Repeat every',
  daysLabel: 'day(s)',
  endRepeatLabel: 'End repeat',
  onLabel: 'On',
  afterLabel: 'After',
  occurrencesLabel: 'occurrence(s)',
  weeksOnLabel: 'week(s) on:',
  monthsLabel: 'month(s)',
  ofEveryMonthLabel: 'of every month',
  theLabel: 'The',
  firstLabel: 'First',
  secondLabel: 'Second',
  thirdLabel: 'Third',
  fourthLabel: 'Fourth',
  lastLabel: 'Last',
  yearsLabel: 'year(s)',
  ofLabel: 'of ',
  everyLabel: 'Every',
};

const CommandLayoutPlaceholder = () => <TemplatePlaceholder name="commandLayout" />;
const BasicLayoutPlaceholder = () => <TemplatePlaceholder name="basicLayout" />;
const RecurrenceLayoutPlaceholder = () => <TemplatePlaceholder name="recurrenceLayout" />;

const pluginDependencies = [
  { name: 'EditingState', optional: true },
  { name: 'Appointments', optional: true },
  { name: 'AppointmentTooltip', optional: true },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true },
];

const prepareChanges = (
  appointmentData, editingAppointment,
  addedAppointment, appointmentChanges,
  resources, plainResources,
) => {
  const isNew = !editingAppointment;
  const changedAppointment = {
    ...appointmentData,
    ...appointmentChanges,
    ...isNew && addedAppointment,
  };
  const appointmentResources = getAppointmentResources(
    changedAppointment, resources, plainResources,
  );
  const isFormEdited = isNew || Object.getOwnPropertyNames(appointmentChanges).length !== 0;
  return { changedAppointment, appointmentResources, isNew, isFormEdited };
};

const isFormFullSize = (
  isFormVisible, changedAppointmentRRule, previousAppointmentRRule,
) => !!changedAppointmentRRule || (!isFormVisible && !!previousAppointmentRRule);

class AppointmentFormBase extends React.PureComponent<AppointmentFormProps, AppointmentFormState> {
  toggleVisibility: (payload?: any) => void;
  setAppointmentData: (payload: any) => void;
  openFormHandler: (payload: AppointmentModel) => void;
  container = React.createRef();

  static defaultProps: Partial<AppointmentFormProps> = {
    messages: {},
    readOnly: false,
    onVisibilityChange: () => undefined,
    onAppointmentDataChange: () => undefined,
  };
  static components: PluginComponents = {
    overlayComponent: 'Overlay',
    layoutComponent: 'Layout',
    commandLayoutComponent: 'CommandLayout',
    commandButtonComponent: 'CommandButton',
    basicLayoutComponent: 'BasicLayout',
    textEditorComponent: 'TextEditor',
    labelComponent: 'Label',
    dateEditorComponent: 'DateEditor',
    booleanEditorComponent: 'BooleanEditor',
    selectComponent: 'Select',
    recurrenceLayoutComponent: 'RecurrenceLayout',
    radioGroupComponent: 'RadioGroup',
    weeklyRecurrenceSelectorComponent: 'WeeklyRecurrenceSelector',
    resourceEditorComponent: 'ResourceEditor',
    containerComponent: 'Container',
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      appointmentData: props.appointmentData || {},
      previousAppointment: props.appointmentData || {},
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        visible: () => {
          const { onVisibilityChange } = this.props;
          return onVisibilityChange;
        },
        appointmentData: () => {
          const { onAppointmentDataChange } = this.props;
          return onAppointmentDataChange;
        },
      },
    );

    const toggleVisibility = () => {
      const { visible: isOpen } = this.state;
      return !isOpen;
    };
    this.toggleVisibility = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisibility);
    this.setAppointmentData = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentData', setAppointmentData);

    this.openFormHandler = (appointmentData) => {
      this.setAppointmentData({ appointmentData });
      this.toggleVisibility();
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      visible = prevState.visible,
      appointmentData = prevState.appointmentData,
    } = nextProps;
    return {
      appointmentData,
      visible,
    };
  }

  commitChanges = memoize((
    finishCommitAppointment, commitAddedAppointment, isNew, changedAppointment,
  ) => () =>  {
    this.toggleVisibility();
    if (isNew) {
      callActionIfExists(commitAddedAppointment, changedAppointment);
    } else if (finishCommitAppointment) {
      finishCommitAppointment();
    }
    this.setState({ previousAppointment: changedAppointment });
  });

  cancelChanges = memoize((
    openCancelConfirmationDialog, isNew, stopEditAppointment, appointmentChanges,
    changedAppointment, cancelAddedAppointment, cancelChangedAppointment,
  ) => () => {
    if (openCancelConfirmationDialog && Object.keys(appointmentChanges).length !== 0) {
      openCancelConfirmationDialog(TOGGLE_APPOINTMENT_FORM_VISIBILITY);
    } else {
      if (isNew) {
        callActionIfExists(cancelAddedAppointment, appointmentChanges);
      } else {
        callActionIfExists(stopEditAppointment, appointmentChanges);
        callActionIfExists(cancelChangedAppointment, appointmentChanges);
      }
      this.toggleVisibility();
    }
    this.setState({ previousAppointment: changedAppointment });
  });

  deleteAppointment = memoize((
    finishDeleteAppointment, appointmentData, openDeleteConfirmationDialog,
    changedAppointment, cancelAddedAppointment, cancelChangedAppointment,
    stopEditAppointment, isNew,
  ) => () => {
    if (openDeleteConfirmationDialog) {
      openDeleteConfirmationDialog({
        hideActionName: TOGGLE_APPOINTMENT_FORM_VISIBILITY, appointmentData: changedAppointment,
      });
    } else {
      callActionIfExists(finishDeleteAppointment, appointmentData);
      if (isNew) {
        callActionIfExists(cancelAddedAppointment, appointmentData);
      } else {
        callActionIfExists(cancelChangedAppointment, appointmentData);
        callActionIfExists(stopEditAppointment, appointmentData);
      }
      this.toggleVisibility();
    }
    this.setState({ previousAppointment: changedAppointment });
  });

  changeAppointmentField = memoize((isNew, changeAddedAppointment, changeAppointment) =>
    (change) => {
      if (change && change.rRule) {
        this.setState({ previousAppointment: {
          ...this.state.previousAppointment, rRule: change.rRule,
        }});
      }
      if (isNew) {
        callActionIfExists(changeAddedAppointment, { change });
      } else {
        callActionIfExists(changeAppointment, { change });
      }
    },
  );

  getMessage = memoize((menuMessages, messages) =>
    getMessagesFormatter({ ...menuMessages, ...messages }));

  render() {
    const {
      containerComponent: Container,
      overlayComponent: Overlay,
      layoutComponent: Layout,
      commandLayoutComponent: CommandLayout,
      basicLayoutComponent: BasicLayout,
      recurrenceLayoutComponent: RecurrenceLayout,
      commandButtonComponent,
      textEditorComponent,
      labelComponent,
      dateEditorComponent,
      booleanEditorComponent,
      selectComponent,
      radioGroupComponent,
      weeklyRecurrenceSelectorComponent,
      resourceEditorComponent,
      readOnly,
      messages,
    } = this.props;
    const { visible, appointmentData, previousAppointment } = this.state;
    const getMessage = this.getMessage(defaultMessages, messages);
    return (
      <Plugin
        name="AppointmentForm"
        dependencies={pluginDependencies}
      >
        <Action name={TOGGLE_APPOINTMENT_FORM_VISIBILITY} action={this.toggleVisibility} />

        <Template name="schedulerRoot">
          <TemplateConnector>
            {({
              editingAppointment,
              addedAppointment,
              appointmentChanges,

              resources,
              plainResources,
            }, {
              openCancelConfirmationDialog,

              stopEditAppointment,
              cancelAddedAppointment,
              cancelChangedAppointment,
            }) => {
              const { changedAppointment, isNew } = prepareChanges(
                appointmentData, editingAppointment,
                addedAppointment, appointmentChanges,
                resources, plainResources,
              );
              const fullSize = isFormFullSize(
                visible, changedAppointment.rRule, previousAppointment.rRule,
              );
              const onHideAction = () => visible && this.cancelChanges(
                openCancelConfirmationDialog, isNew, stopEditAppointment,
                { ...appointmentChanges, ...addedAppointment }, changedAppointment,
                cancelAddedAppointment, cancelChangedAppointment,
              )();

              return (
                <React.Fragment>
                  <Container ref={this.container} />
                  <Overlay
                    visible={visible}
                    onHide={onHideAction}
                    fullSize={fullSize}
                    target={this.container}
                  >
                    <Layout
                      basicLayoutComponent={BasicLayoutPlaceholder}
                      commandLayoutComponent={CommandLayoutPlaceholder}
                      recurrenceLayoutComponent={RecurrenceLayoutPlaceholder}
                      isRecurrence={fullSize}
                    />
                  </Overlay>
                  <TemplatePlaceholder />
                </React.Fragment>);
            }}
          </TemplateConnector>
        </Template>
        <Template name="commandLayout">
          <TemplateConnector>
            {({
              editingAppointment,
              addedAppointment,
              appointmentChanges,

              resources,
              plainResources,
            }, {
              commitAddedAppointment,
              finishCommitAppointment,
              finishDeleteAppointment,

              stopEditAppointment,
              cancelAddedAppointment,
              cancelChangedAppointment,

              openCancelConfirmationDialog,
              openDeleteConfirmationDialog,
            }) => {
              const { isNew, changedAppointment, isFormEdited } = prepareChanges(
                appointmentData, editingAppointment,
                addedAppointment, appointmentChanges,
                resources, plainResources,
              );
              const isRecurrence = isFormFullSize(
                visible, changedAppointment.rRule, previousAppointment.rRule,
              );
              return (
                <CommandLayout
                  commandButtonComponent={commandButtonComponent}
                  onCommitButtonClick={this.commitChanges(
                    finishCommitAppointment, commitAddedAppointment, isNew, changedAppointment,
                  )}
                  onCancelButtonClick={this.cancelChanges(
                    openCancelConfirmationDialog, isNew, stopEditAppointment,
                    { ...appointmentChanges, ...addedAppointment }, changedAppointment,
                    cancelAddedAppointment, cancelChangedAppointment,
                  )}
                  onDeleteButtonClick={this.deleteAppointment(
                    finishDeleteAppointment, appointmentData, openDeleteConfirmationDialog,
                    changedAppointment, cancelAddedAppointment, cancelChangedAppointment,
                    stopEditAppointment, isNew,
                  )}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  fullSize={isRecurrence}
                  disableSaveButton={!isFormEdited}
                  hideDeleteButton={isNew}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="basicLayout">
          <TemplateConnector>
            {({
              editingAppointment,
              addedAppointment,
              appointmentChanges,
              locale,

              resources,
              plainResources,
            }, {
              changeAppointment,
              changeAddedAppointment,
            }) => {
              const { isNew, changedAppointment, appointmentResources } = prepareChanges(
                appointmentData, editingAppointment,
                addedAppointment, appointmentChanges,
                resources, plainResources,
              );
              return (
                <BasicLayout
                  locale={locale}
                  appointmentData={visible ? changedAppointment : previousAppointment}
                  onFieldChange={this.changeAppointmentField(
                    isNew, changeAddedAppointment, changeAppointment,
                  )}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  textEditorComponent={textEditorComponent}
                  dateEditorComponent={dateEditorComponent}
                  booleanEditorComponent={booleanEditorComponent}
                  selectComponent={selectComponent}
                  labelComponent={labelComponent}
                  resourceEditorComponent={resourceEditorComponent}
                  fullSize={!changedAppointment.rRule}
                  resources={resources}
                  appointmentResources={appointmentResources as Array<ValidResourceInstance>}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="recurrenceLayout">
          <TemplateConnector>
            {({
              editingAppointment,
              addedAppointment,
              appointmentChanges,
              formatDate,
              locale,
              firstDayOfWeek,
            }, {
              changeAddedAppointment,
              changeAppointment,
            }) => {
              const { isNew, changedAppointment } = prepareChanges(
                appointmentData, editingAppointment,
                addedAppointment, appointmentChanges,
                undefined, undefined,
              );
              const isRecurrenceLayoutVisible = isFormFullSize(
                visible, changedAppointment.rRule, previousAppointment.rRule,
              );
              const correctedAppointment = !changedAppointment.rRule
                ? { ...changedAppointment, rRule: previousAppointment.rRule } : changedAppointment;

              return (
                <RecurrenceLayout
                  locale={locale}
                  appointmentData={visible ? correctedAppointment : previousAppointment}
                  onFieldChange={this.changeAppointmentField(
                    isNew, changeAddedAppointment, changeAppointment,
                  )}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  formatDate={formatDate}
                  textEditorComponent={textEditorComponent}
                  dateEditorComponent={dateEditorComponent}
                  radioGroupComponent={radioGroupComponent}
                  weeklyRecurrenceSelectorComponent={weeklyRecurrenceSelectorComponent}
                  labelComponent={labelComponent}
                  selectComponent={selectComponent}
                  visible={isRecurrenceLayoutVisible}
                  firstDayOfWeek={firstDayOfWeek}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="tooltip">
          {(params: AppointmentTooltip.LayoutProps) => (
            <TemplateConnector>
              {(getters, { startEditAppointment }) => (
                <TemplatePlaceholder
                  params={{
                    ...params,
                    onOpenButtonClick: () => {
                      this.openFormHandler(params.appointmentMeta!.data);
                      callActionIfExists(startEditAppointment, params.appointmentMeta!.data);
                    },
                  }}
                />
              )}
            </TemplateConnector>
          )}
        </Template>

        <Template name="appointment">
          {(params: Appointments.AppointmentProps) => (
            <TemplateConnector>
              {(getters, { startEditAppointment }) => (
                <TemplatePlaceholder
                  params={{
                    ...params,
                    onDoubleClick: () => {
                      this.openFormHandler(params.data);
                      callActionIfExists(startEditAppointment, params.data);
                    },
                  }}
                />
              )}
            </TemplateConnector>
          )}
        </Template>

        <Template name="cell">
          {(params: any) => (
            <TemplateConnector>
              {({ resources }, { addAppointment }) => addDoubleClickToCell(
                undefined, params.startDate, params.endDate, params.groupingInfo, resources,
                isAllDayCell(params.startDate, params.endDate),
                this.openFormHandler, addAppointment, params,
              )}
            </TemplateConnector>
          )}
        </Template>

        <Template name="allDayPanelCell">
          {(params: any) => (
            <TemplateConnector>
              {({ resources }, { addAppointment }) => addDoubleClickToCell(
                undefined, params.startDate, params.endDate, params.groupingInfo, resources,
                true, this.openFormHandler, addAppointment, params,
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin >
    );
  }
}

// tslint:disable-next-line: max-line-length
/** The AppointmentForm plugin renders a form that visualizes appointment’s data and allows a user to modify this data. */
export const AppointmentForm: React.ComponentType<AppointmentFormProps> = AppointmentFormBase;
