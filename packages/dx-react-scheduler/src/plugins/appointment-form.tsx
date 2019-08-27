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
} from '@devexpress/dx-react-core';
import {
  setAppointmentData,
  isAllDayCell,
  callActionIfExists,
  AppointmentModel,
} from '@devexpress/dx-scheduler-core';

import {
  AppointmentFormProps, AppointmentFormState, AppointmentTooltip, Appointments,
} from '../types';

const defaultMessages = {
  allDayLabel: 'All Day',
  titleLabel: 'Title',
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
];

const prepareChanges = (
  appointmentData, editingAppointment, addedAppointment, appointmentChanges,
) => {
  const isNew = !editingAppointment;
  const changedAppointment = {
    ...appointmentData,
    ...isNew ? addedAppointment : appointmentChanges,
  };
  return { changedAppointment, isNew };
};

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

  commitChanges = memoize((finishCommitAppointment, commitAddedAppointment, isNew) => () =>  {
    this.toggleVisibility();
    if (!finishCommitAppointment) return;
    if (isNew) {
      commitAddedAppointment();
    } else {
      finishCommitAppointment();
    }
  });

  cancelChanges = memoize((
    cancelAddedAppointment, stopEditAppointment, cancelChangedAppointment, isNew,
  ) => () => {
    this.toggleVisibility();
    if (!cancelAddedAppointment) return;
    if (isNew) {
      cancelAddedAppointment();
    } else {
      stopEditAppointment();
      cancelChangedAppointment();
    }
  });

  deleteAppointment = memoize((finishDeleteAppointment, appointmentData) => () => {
    callActionIfExists(finishDeleteAppointment, appointmentData);
    this.toggleVisibility();
  });

  changeAppointmentField = memoize((isNew, changeAddedAppointment, changeAppointment) =>
    isNew ? change => callActionIfExists(changeAddedAppointment, { change })
    : change => callActionIfExists(changeAppointment, { change }),
  );

  getMessage = memoize((messages, menuMessages) =>
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
      readOnly,
      messages,
    } = this.props;
    const { visible, appointmentData } = this.state;
    const getMessage = this.getMessage(defaultMessages, messages);

    return (
      <Plugin
        name="AppointmentForm"
        dependencies={pluginDependencies}
      >
        <Template name="schedulerRoot">
          <TemplateConnector>
            {({
              editingAppointment,
              addedAppointment,
              appointmentChanges,
            }) => {
              const { changedAppointment } = prepareChanges(
                appointmentData, editingAppointment, addedAppointment, appointmentChanges,
              );
              const isRecurrence = !!changedAppointment.rRule;

              return (
                <React.Fragment>
                  <Container ref={this.container} />
                  <Overlay
                    visible={visible}
                    onHide={this.toggleVisibility}
                    fullSize={isRecurrence}
                    target={this.container}
                  >
                    <Layout
                      basicLayoutComponent={BasicLayoutPlaceholder}
                      commandLayoutComponent={CommandLayoutPlaceholder}
                      recurrenceLayoutComponent={RecurrenceLayoutPlaceholder}
                      isRecurrence={isRecurrence}
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
            }, {
              cancelChangedAppointment,
              cancelAddedAppointment,

              commitAddedAppointment,
              finishCommitAppointment,
              finishDeleteAppointment,

              stopEditAppointment,
            }) => {
              const { isNew, changedAppointment } = prepareChanges(
                appointmentData, editingAppointment, addedAppointment, appointmentChanges,
              );
              return (
                <CommandLayout
                  commandButtonComponent={commandButtonComponent}
                  onCommitButtonClick={this.commitChanges(
                    finishCommitAppointment, commitAddedAppointment, isNew,
                  )}
                  onCancelButtonClick={this.cancelChanges(
                    cancelAddedAppointment, stopEditAppointment, cancelChangedAppointment, isNew,
                  )}
                  onDeleteButtonClick={this.deleteAppointment(
                    finishDeleteAppointment, appointmentData,
                  )}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  fullSize={!!changedAppointment.rRule}
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
            }, {
              changeAppointment,
              changeAddedAppointment,
            }) => {
              const { isNew, changedAppointment } = prepareChanges(
                appointmentData, editingAppointment, addedAppointment, appointmentChanges,
              );
              return (
                <BasicLayout
                  appointmentData={changedAppointment}
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
            }, {
              changeAddedAppointment,
              changeAppointment,
            }) => {
              const { isNew, changedAppointment } = prepareChanges(
                appointmentData, editingAppointment, addedAppointment, appointmentChanges,
              );

              return (
                <RecurrenceLayout
                  appointmentData={changedAppointment}
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
              {(getters, {
                startEditAppointment,
              }) => (
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
