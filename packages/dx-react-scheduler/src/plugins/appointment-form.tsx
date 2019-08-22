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
} from '@devexpress/dx-scheduler-core';

import {
  AppointmentFormProps, AppointmentFormState, AppointmentTooltip, Appointments,
} from '../types';

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

const CommandLayoutPlaceholder = () => <TemplatePlaceholder name="commandLayout" />;
const BasicLayoutPlaceholder = () => <TemplatePlaceholder name="basicLayout" />;
const RecurrenceLayoutPlaceholder = () => <TemplatePlaceholder name="recurrenceLayout" />;

const pluginDependencies = [
  { name: 'EditingState', optional: true },
  { name: 'Appointments', optional: true },
  { name: 'AppointmentTooltip', optional: true },
];

class AppointmentFormBase extends React.PureComponent<AppointmentFormProps, AppointmentFormState> {
  toggleVisibility: (payload?: any) => void;
  setAppointmentData: (payload: any) => void;
  openFormHandler: (payload: AppointmentModel) => void;
  container = React.createRef<Element>(); // ??????

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
      overlayComponent: Overlay,
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
            }, actions) => {
              const isNew = !!editingAppointment;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };

              return (
                <React.Fragment>
                  <Container
                    anchor={this.container}
                  />
                  <Overlay
                    visible={visible}
                    onHide={this.toggleVisibility}
                    fullSize={changedAppointment.rRule !== undefined}
                    target={this.container.current}
                  >
                    <Layout
                      basicLayoutComponent={BasicLayoutPlaceholder}
                      commandLayoutComponent={CommandLayoutPlaceholder}
                      recurrenceLayoutComponent={RecurrenceLayoutPlaceholder}
                      isRecurring={changedAppointment.rRule !== undefined}
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
              commitChangedAppointment,
              commitDeletedAppointment,

              stopEditAppointment,
            }) => {
              const isNew = !!editingAppointment;
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
                  commandButtonComponent={commandButtonComponent}
                  commitAppointment={commitAppointment}
                  cancelCommit={cancelCommit}
                  deleteAppointment={deleteAppointment}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  isRecurring={!!changedAppointment.rRule}
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
              const isNew = !!editingAppointment;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };
              const changeAppointmentAction = changes => changeAppointment({ change: changes });
              const changeAddedAppointmentAction = changes => changeAddedAppointment({
                change: changes,
              });
              const changeAppointmentField = isNew
                ? changeAddedAppointmentAction
                : changeAppointmentAction;
              return (
                <BasicLayout
                  textEditorComponent={textEditorComponent}
                  dateEditorComponent={dateEditorComponent}
                  allDayComponent={booleanEditorComponent}
                  selectComponent={Select}
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
              editingAppointment,
              addedAppointment,
              appointmentChanges,
              formatDate,
            }, {
              changeAddedAppointment,
              changeAppointment,
              cancelChangedAppointment,
              finishCommitAppointment,
            }) => {
              const isNew = !!editingAppointment;
              const changedAppointment = {
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };
              const changeAppointmentAction = changes => changeAppointment({ change: changes });
              const changeAddedAppointmentAction = changes => changeAddedAppointment({
                change: changes,
              });
              const changeAppointmentField = isNew
                ? changeAddedAppointmentAction
                : changeAppointmentAction;

              return (
                <RecurrenceLayout
                  changedAppointment={changedAppointment}
                  radioGroupComponent={radioGroupComponent}
                  textEditorComponent={textEditorComponent}
                  dateEditorComponent={dateEditorComponent}
                  labelComponent={Label}
                  {...changeAppointment && {
                    onAppointmentFieldChange: changeAppointmentField,
                  }}
                  getMessage={getMessage}
                  readOnly={readOnly}
                  selectComponent={Select}
                  buttonGroupComponent={buttonGroupComponent}
                  formatDate={formatDate}
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
