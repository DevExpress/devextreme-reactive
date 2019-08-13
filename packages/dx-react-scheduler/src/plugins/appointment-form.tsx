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

const getRRuleFrequence = repeatType => RRULE_REPEAT_TYPES[repeatType];

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
  sunLabel: 'Sun',
  monLabel: 'Mon',
  tueLabel: 'Tue',
  wedLabel: 'Wed',
  thuLabel: 'Thu',
  friLabel: 'Fri',
  satLabel: 'Sat',
  monthsLabel: 'month(s)',
  ofEveryMonthLabel: '\'th of every month',
  theLabel: 'The',
  firstLabel: 'First',
  secondLabel: 'Second',
  thirdLabel: 'Third',
  fourthLabel: 'Fourth',
  lastLabel: 'Last',
  januaryLabel: 'January',
  februaryLabel: 'February',
  marchLabel: 'March',
  aprilLabel: 'April',
  mayLabel: 'May',
  juneLabel: 'June',
  julyLabel: 'July',
  augustLabel: 'August',
  septemberLabel: 'September',
  octoberLabel: 'October',
  novemberLabel: 'November',
  decemberLabel: 'December',
  sundayLabel: 'Sunday',
  mondayLabel: 'Monday',
  tuesdayLabel: 'Tuesday',
  wednesdayLabel: 'Wednesday',
  thursdayLabel: 'Thursday',
  fridayLabel: 'Friday',
  saturdayLabel: 'Saturday',
  yearsLabel: 'year(s)',
  ofLabel: 'of',
};

const REPEAT_TYPES = {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  yearly: 'yearly',
  never: 'never',
};

const ControlLayoutPlaceholder = () => <TemplatePlaceholder name="controlLayout" />;
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

  static defaultProps: Partial<AppointmentFormProps> = {
    messages: {},
    readOnly: false,
    onVisibilityChange: () => undefined,
    onAppointmentDataChange: () => undefined,
  };
  static components: PluginComponents = {
    rootComponent: 'Root',
    layoutComponent: 'Layout',
    controlLayoutComponent: 'ControlLayout',
    controlButtonComponent: 'ControlButton',
    basicLayoutComponent: 'BasicLayout',
    textEditorComponent: 'TextEditor',
    labelComponent: 'Label',
    dateAndTimeEditorComponent: 'DateAndTimeEditor',
    booleanEditorComponent: 'BooleanEditor',
    switcherComponent: 'Switcher',
    recurrenceLayoutComponent: 'RecurrenceLayout',
    radioGroupEditorComponent: 'RadioGroupEditor',
    groupedButtonsComponent: 'GroupedButtons',
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
    this.ref = React.createRef();
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
      layoutComponent: Layout,
      controlLayoutComponent: ControlLayout,
      controlButtonComponent: ControlButton,
      rootComponent: Root,
      basicLayoutComponent: BasicLayout,
      textEditorComponent: TextEditor,
      labelComponent: Label,
      dateAndTimeEditorComponent: DateAndTimeEditor,
      booleanEditorComponent: BooleanEditor,
      switcherComponent: Switcher,
      recurrenceLayoutComponent: RecurrenceLayout,
      radioGroupEditorComponent: RadioGroupEditor,
      groupedButtonsComponent: GroupedButtons,
      readOnly,
      messages,
      scheduler,
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
              frequency = REPEAT_TYPES.never;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.daily) frequency = REPEAT_TYPES.daily;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.weekly) frequency = REPEAT_TYPES.weekly;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.monthly) frequency = REPEAT_TYPES.monthly;
              if (rRuleFrequency === RRULE_REPEAT_TYPES.yearly) frequency = REPEAT_TYPES.yearly;
              return (
                <React.Fragment>
                  <React.Fragment>
                    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                      <div
                        style={{ position: 'relative', width: '100%', height: '100%' }}
                        ref={this.ref}
                      />
                    </div>
                    <Root
                      visible={visible}
                      scheduler={scheduler}
                      container={this.ref.current}
                      style={{ position: 'absolute' }}
                      frequency={frequency}
                    >
                      <Layout
                        basicLayoutComponent={BasicLayoutPlaceholder}
                        controlLayoutComponent={ControlLayoutPlaceholder}
                        recurrenceLayoutComponent={RecurrenceLayoutPlaceholder}
                        isRecurring={frequency !== REPEAT_TYPES.never}
                      />
                    </Root>
                  </React.Fragment>
                  <TemplatePlaceholder />
                </React.Fragment>);
            }}
          </TemplateConnector>
        </Template>
        <Template name="controlLayout">
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
                <ControlLayout
                  controlButtonComponent={ControlButton}
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
                  isRecurring={frequency !== REPEAT_TYPES.never}
                  textEditorComponent={TextEditor}
                  dateTimeEditorComponent={DateAndTimeEditor}
                  allDayComponent={BooleanEditor}
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
                  radioGroupEditorComponent={RadioGroupEditor}
                  textEditorComponent={TextEditor}
                  dateAndTimeEditorComponent={DateAndTimeEditor}
                  labelComponent={Label}
                  {...changeAppointment && {
                    onRecurrenceOptionsChange: newOptions => setNewRRule(newOptions),
                    onAppointmentFieldChange: changeAppointmentField,
                  }}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  switcherComponent={Switcher}
                  groupedButtonsComponent={GroupedButtons}
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
                <Switcher
                  {...changeAppointment && {
                    onChange: (repeatType) => {
                      const rruleRepeatType = getRRuleFrequence(repeatType);
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
                      text: getMessage(REPEAT_TYPES.never),
                      id: REPEAT_TYPES.never,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.daily),
                      id: REPEAT_TYPES.daily,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.weekly),
                      id: REPEAT_TYPES.weekly,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.monthly),
                      id: REPEAT_TYPES.monthly,
                    },
                    {
                      text: getMessage(REPEAT_TYPES.yearly),
                      id: REPEAT_TYPES.yearly,
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
