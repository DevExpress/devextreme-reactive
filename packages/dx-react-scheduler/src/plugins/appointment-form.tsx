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
};

const ControlLayoutPlaceholder = () => <TemplatePlaceholder name="controlLayout" />;
const BasicLayoutPlaceholder = () => <TemplatePlaceholder name="basicLayout" />;
const RecurrenceLayoutPlaceholder = () => <TemplatePlaceholder name="recurrenceLayout" />;
const RecurrenceSwitcherPlaceholder = () => <TemplatePlaceholder name="recurrenceSwitcher" />;
const RadioGroupEditorPlaceholder = () => <TemplatePlaceholder name="radioGroupEditor" />;

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
    saveButtonComponent: 'SaveButton',
    deleteButtonComponent: 'DeleteButton',
    cancelButtonComponent: 'CancelButton',
    basicLayoutComponent: 'BasicLayout',
    textEditorComponent: 'TextEditor',
    labelComponent: 'Label',
    dateAndTimeEditorComponent: 'DateAndTimeEditor',
    booleanEditorComponent: 'BooleanEditor',
    switcherComponent: 'Switcher',
    recurrenceLayoutComponent: 'RecurrenceLayout',
    radioGroupEditorComponent: 'RadioGroupEditor',
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      appointmentData: props.appointmentData || {},
      recurrenceEditing: 'Never',
      rRule: undefined,
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
      saveButtonComponent: SaveButton,
      deleteButtonComponent: DeleteButton,
      cancelButtonComponent: CancelButton,
      rootComponent: Root,
      basicLayoutComponent: BasicLayout,
      textEditorComponent: TextEditor,
      labelComponent: Label,
      dateAndTimeEditorComponent: DateAndTimeEditor,
      booleanEditorComponent: BooleanEditor,
      switcherComponent: Switcher,
      recurrenceLayoutComponent: RecurrenceLayout,
      radioGroupEditorComponent: RadioGroupEditor,
      readOnly,
      messages,
      scheduler,
    } = this.props;
    const { visible, appointmentData, recurrenceEditing } = this.state;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    return (
      <Plugin
        name="AppointmentForm"
        dependencies={pluginDependencies}
      >
        <Template name="schedulerRoot">
          <React.Fragment>
            <React.Fragment>
              <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}
                  ref={this.ref}
                />
              </div>

              <Root
                visible={visible}
                scheduler={scheduler}
                container={this.ref.current}
                style={{ position: 'absolute' }}
                recurrenceEditing={recurrenceEditing}
              >

                <Layout
                  basicLayoutComponent={BasicLayoutPlaceholder}
                  controlLayoutComponent={ControlLayoutPlaceholder}
                  recurrenceLayoutComponent={RecurrenceLayoutPlaceholder}
                  recurrenceEditing={
                    !recurrenceEditing ||
                    (recurrenceEditing !== getMessage('never'))
                  }
                />
              </Root>
            </React.Fragment>
            <TemplatePlaceholder />
          </React.Fragment>
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
              }
              return (
                <ControlLayout
                  saveButtonComponent={SaveButton}
                  deleteButtonComponent={DeleteButton}
                  cancelButtonComponent={CancelButton}
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
                  recurrenceEditing={recurrenceEditing}
                  textEditorComponent={TextEditor}
                  dateTimeEditorComponent={DateAndTimeEditor}
                  allDayComponent={BooleanEditor}
                  recurrenceSwitcherComponent={RecurrenceSwitcherPlaceholder}
                  labelComponent={Label}
                  getMessage={getMessage}
                  changeAppointmentField={changeAppointmentField}
                  changedAppointment={changedAppointment}
                  changeAppointment={changeAppointment}
                />);
            }}
          </TemplateConnector>
        </Template>

        <Template name="recurrenceLayout">
          <RecurrenceLayout
            recurrenceSwitcherComponent={RecurrenceSwitcherPlaceholder}
            radioGroupEditorComponent={RadioGroupEditorPlaceholder}
            labelComponent={Label}
            getMessage={getMessage}
          />
        </Template>

        <Template name="recurrenceSwitcher">
          <Switcher
            onChange={repeatType => this.setState({
              recurrenceEditing: repeatType,
            })}
            availableOptions={[
              getMessage('never'),
              getMessage('daily'),
              getMessage('weekly'),
              getMessage('monthly'),
              getMessage('yearly'),
            ]}
            value={recurrenceEditing}
          />
        </Template>

        <Template name="radioGroupEditor">
          <RadioGroupEditor
          />
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
