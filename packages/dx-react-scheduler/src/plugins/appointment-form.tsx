import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  createStateHelper,
  StateHelper,
  TemplateConnector,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  setAppointmentData,
  isAllDayCell,
  callActionIfExists,
  AppointmentModel,
  RRULE_REPEAT_TYPES,
  changeRecurrenceFrequency,
  getRecurrenceFrequency,
  changeRecurrenceOptions,
  OUTLINED_SWITCHER,
} from '@devexpress/dx-scheduler-core';

import {
  AppointmentFormProps, AppointmentFormState, AppointmentTooltip, Appointments,
} from '../types';

const getRRuleFrequency = repeatType => RRULE_REPEAT_TYPES[repeatType.toUpperCase()];

const defaultMessages = {
  allDayLabel: 'All Day',
  titleLabel: 'Title',
  startDateLabel: 'Start Date',
  endDateLabel: 'End Date',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
  detailsLabel: 'Details',
  moreInformationLabel: 'More Information',
  repeatLabel: 'Repeat',
  additionalInformationLabel: 'Additional Information',
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
  occurencesLabel: 'occurence(s)',
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
  thLabel: '\'th',
  stLabel: '\'st',
  ndLabel: '\'nd',
  rdLabel: '\'rd',
};

const REPEAT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
};

const CommandLayoutPlaceholder = () => <TemplatePlaceholder name="commandLayout" />;
const BasicLayoutPlaceholder = () => <TemplatePlaceholder name="basicLayout" />;
const RecurrenceLayoutPlaceholder = () => <TemplatePlaceholder name="recurrenceLayout" />;
const RecurrenceSwitcherPlaceholder = () => <TemplatePlaceholder name="recurrenceSwitcher" />;

const pluginDependencies = [
  { name: 'EditingState', optional: true },
  { name: 'Appointments', optional: true },
  { name: 'AppointmentTooltip', optional: true },
];

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
    rootComponent: 'Root',
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
    buttonGroupComponent: 'ButtonGroup',
    containerComponent: 'Container',
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      appointmentData: props.appointmentData || {},
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

  render() {
    const {
      containerComponent: Container,
      rootComponent: Root,
      layoutComponent: Layout,
      commandLayoutComponent: CommandLayout,
      basicLayoutComponent: BasicLayout,
      recurrenceLayoutComponent: RecurrenceLayout,
      commandButtonComponent,
      textEditorComponent,
      labelComponent: Label,
      dateEditorComponent,
      booleanEditorComponent,
      selectComponent: Select,
      radioGroupComponent,
      buttonGroupComponent,
      readOnly,
      messages,
    } = this.props;
    const { visible, appointmentData } = this.state;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    let frequency;

    return (
      <Plugin
        name="AppointmentForm"
        dependencies={pluginDependencies}
      >
        <Template name="schedulerRoot">
          <TemplateConnector>
            {({
              editingAppointmentId,
              addedAppointment,
              appointmentChanges,
            }, actions) => {
              const isNew = editingAppointmentId === undefined;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };
              const rRuleFrequency = getRecurrenceFrequency(changedAppointment.rRule);
              frequency = REPEAT_TYPES.NEVER;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.DAILY) frequency = REPEAT_TYPES.DAILY;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.WEEKLY) frequency = REPEAT_TYPES.WEEKLY;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.MONTHLY) frequency = REPEAT_TYPES.MONTHLY;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.YEARLY) frequency = REPEAT_TYPES.YEARLY;
              return (
                <React.Fragment>
                  <Container
                    anchor={this.container}
                  />
                  <Root
                    visible={visible}
                    closeHandler={this.toggleVisibility}
                    fullSize={frequency !== 'never'}
                    container={this.container.current}
                  >
                    <Layout
                      basicLayoutComponent={BasicLayoutPlaceholder}
                      controlLayoutComponent={CommandLayoutPlaceholder}
                      recurrenceLayoutComponent={RecurrenceLayoutPlaceholder}
                      isRecurring={frequency !== REPEAT_TYPES.NEVER}
                    />
                  </Root>
                  <TemplatePlaceholder />
                </React.Fragment>);
            }}
          </TemplateConnector>
        </Template>
        <Template name="commandLayout">
          <TemplateConnector>
            {({
              editingAppointmentId,
              addedAppointment,
              appointmentChanges,
            }, {
              cancelChangedAppointment,
              cancelAddedAppointment,

              commitAddedAppointment,
              commitChangedAppointment,
              commitDeletedAppointment,

              stopEditAppointment,
            }) => {
              const isNew = editingAppointmentId === undefined;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };

              const commitAppointment = () => {
                this.toggleVisibility();
                if (commitChangedAppointment) {
                  if (isNew) {
                    commitAddedAppointment();
                  } else {
                    commitChangedAppointment({
                      appointmentId: changedAppointment.id,
                    });
                  }
                }
              };

              const cancelCommit = () => {
                this.toggleVisibility();
                if (stopEditAppointment) {
                  if (isNew) {
                    cancelAddedAppointment();
                  } else {
                    stopEditAppointment();
                    cancelChangedAppointment();
                  }
                }
              };

              const deleteAppointment = () => {
                commitDeletedAppointment({
                  deletedAppointmentId: changedAppointment.id,
                });
                this.toggleVisibility();
              };

              return (
                <CommandLayout
                  controlButtonComponent={commandButtonComponent}
                  commitAppointment={commitAppointment}
                  cancelCommit={cancelCommit}
                  deleteAppointment={deleteAppointment}
                  getMessage={getMessage}
                  readOnly={readOnly}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="basicLayout">
          <TemplateConnector>
            {({
              editingAppointmentId,
              addedAppointment,
              appointmentChanges,
            }, {
              changeAppointment,
              changeAddedAppointment,
            }) => {
              const isNew = editingAppointmentId === undefined;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };
              const changeAppointmentField = isNew
                ? changeAddedAppointment
                : changeAppointment;
              return (
                <BasicLayout
                  isRecurring={frequency !== REPEAT_TYPES.NEVER}
                  textEditorComponent={textEditorComponent}
                  dateTimeEditorComponent={dateEditorComponent}
                  allDayComponent={booleanEditorComponent}
                  recurrenceSwitcherComponent={RecurrenceSwitcherPlaceholder}
                  labelComponent={Label}
                  getMessage={getMessage}
                  {...changeAppointment && {
                    onAppointmentFieldChange: changeAppointmentField,
                  }}
                  changedAppointment={changedAppointment}
                />);
            }}
          </TemplateConnector>
        </Template>

        <Template name="recurrenceLayout">
          <TemplateConnector>
            {({
              editingAppointmentId,
              addedAppointment,
              appointmentChanges,
              formatDate,
            }, {
              changeAddedAppointment,
              changeAppointment,
            }) => {
              const isNew = editingAppointmentId === undefined;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };
              const changeAppointmentField = isNew
                ? changeAddedAppointment
                : changeAppointment;

              const setNewRRule = (newOptions) => {
                const rRule = changeRecurrenceOptions(newOptions);
                changeAppointmentField({ change: { rRule } });
              };
              return (
                <RecurrenceLayout
                  frequency={frequency}
                  changedAppointment={changedAppointment}
                  recurrenceSwitcherComponent={RecurrenceSwitcherPlaceholder}
                  radioGroupEditorComponent={radioGroupComponent}
                  textEditorComponent={textEditorComponent}
                  dateAndTimeEditorComponent={dateEditorComponent}
                  labelComponent={Label}
                  {...changeAppointment && {
                    onRecurrenceOptionsChange: newOptions => setNewRRule(newOptions),
                    onAppointmentFieldChange: changeAppointmentField,
                  }}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  switcherComponent={Select}
                  groupedButtonsComponent={buttonGroupComponent}
                  formatDate={formatDate}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="recurrenceSwitcher">
          <TemplateConnector>
            {({
              editingAppointmentId,
              addedAppointment,
              appointmentChanges,
            }, {
              changeAppointment,
              changeAddedAppointment,
            }) => {
              const isNew = editingAppointmentId === undefined;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };
              const changeAppointmentField = isNew
                ? changeAddedAppointment
                : changeAppointment;
              return (
                <Select
                  {...changeAppointment && {
                    onChange: (repeatType) => {
                      const rruleRepeatType = getRRuleFrequency(repeatType);
                      let rRule;
                      if (rruleRepeatType !== undefined) {
                        rRule = changeRecurrenceFrequency(
                          changedAppointment.rRule,
                          rruleRepeatType,
                          changedAppointment.startDate,
                        );
                      }
                      changeAppointmentField({ change: { rRule } });
                    },
                  }}
                  availableOptions={[
                    {
                      text: getMessage(REPEAT_TYPES.NEVER),
                      id: REPEAT_TYPES.NEVER,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.DAILY),
                      id: REPEAT_TYPES.DAILY,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.WEEKLY),
                      id: REPEAT_TYPES.WEEKLY,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.MONTHLY),
                      id: REPEAT_TYPES.MONTHLY,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.YEARLY),
                      id: REPEAT_TYPES.YEARLY,
                    },
                  ]}
                  value={frequency}
                  id={OUTLINED_SWITCHER}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="tooltip">
          {(params: AppointmentTooltip.LayoutProps) => (
            <TemplateConnector>
              {(getters, {
                startEditAppointment,
              }) => (
                  <TemplatePlaceholder
                    params={{
                      ...params,
                      onOpenButtonClick: () => {
                        this.openFormHandler(params.appointmentMeta!.data);
                        callActionIfExists(startEditAppointment, {
                          appointmentId: params.appointmentMeta!.data.id,
                        });
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
              {(getters, {
                startEditAppointment,
              }) => (
                  <TemplatePlaceholder
                    params={{
                      ...params,
                      onDoubleClick: () => {
                        this.openFormHandler(params.data);
                        callActionIfExists(startEditAppointment, {
                          appointmentId: params.data.id,
                        });
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
              {(getters, {
                addAppointment,
              }) => {
                const newAppointmentData = {
                  title: undefined,
                  startDate: params.startDate,
                  endDate: params.endDate,
                  allDay: isAllDayCell(params.startDate, params.endDate),
                };
                return (
                  <TemplatePlaceholder
                    params={{
                      ...params,
                      onDoubleClick: () => {
                        this.openFormHandler(newAppointmentData);
                        callActionIfExists(addAppointment,
                          { appointmentData: newAppointmentData });
                      },
                    }}
                  />
                );
              }}
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
