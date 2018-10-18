import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  createStateHelper,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  setAppointment,
  isAllDayCell,
  callActionIfExists,
  changeAppointmentField,
  COMMIT_COMMAND_BUTTON,
  CANCEL_COMMAND_BUTTON,
} from '@devexpress/dx-scheduler-core';

const defaultMessages = {
  allDayText: 'All Day',
  titleLabel: 'Title',
  startDateLabel: 'Start Date',
  endDateLabel: 'End Date',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
};

const pluginDependencies = [
  { name: 'EditingState', optional: true },
  { name: 'Appointments', optional: true },
  { name: 'AppointmentTooltip', optional: true },
];

export class AppointmentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      appointment: props.appointment || {},
    };

    const stateHelper = createStateHelper(
      this,
      {
        visible: () => props.onVisibilityChange,
        appointment: () => props.onAppointmentChange,
      },
    );

    const toggleVisibility = () => {
      const { visible: isOpen } = this.state;
      return !isOpen;
    };
    this.toggleVisibility = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisibility);
    this.setAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointment', setAppointment);

    this.openFormHandler = (appointment) => {
      this.setAppointment({ appointment });
      this.toggleVisibility();
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      visible = prevState.visible,
      appointment = prevState.appointment,
    } = nextProps;
    return {
      appointment,
      visible,
    };
  }

  render() {
    const {
      allDayEditorComponent: AllDayEditor,
      containerComponent: Container,
      scrollableSpaceContainer: ScrollableSpace,
      staticSpaceContainer: StaticSpace,
      popupComponent: Popup,
      dateEditorComponent: DateEditor,
      textEditorComponent: TextEditor,
      commandButtonComponent: CommandButton,
      readOnly,
      messages,
    } = this.props;
    const { visible, appointment } = this.state;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    return (
      <Plugin
        name="AppointmentForm"
        dependencies={pluginDependencies}
      >
        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              getAppointmentTitle,
              getAppointmentStartDate,
              getAppointmentEndDate,
              getAppointmentAllDay,
              getAppointmentId,

              setAppointmentTitle,
              setAppointmentStartDate,
              setAppointmentEndDate,
              setAppointmentAllDay,

              addedAppointment,
              appointmentChanges,
              editingAppointmentId,
            }, {
              stopEditAppointment,

              changeAddedAppointment,
              cancelAddedAppointment,
              commitAddedAppointment,

              changeAppointment,
              cancelChangedAppointment,
              commitChangedAppointment,
            }) => {
              const isNew = editingAppointmentId === undefined;
              const changedAppointment = {
                ...appointment,
                ...isNew ? addedAppointment : appointmentChanges,
              };

              return (
                <Popup
                  visible={visible}
                >
                  <Container>
                    <ScrollableSpace>
                      <TextEditor
                        readOnly={readOnly}
                        label={getMessage('titleLabel')}
                        value={getAppointmentTitle(changedAppointment)}
                        {...changeAppointment && {
                          onValueChange: changeAppointmentField(
                            isNew,
                            changeAddedAppointment,
                            changeAppointment,
                            setAppointmentTitle,
                          ),
                        }}
                      />
                      <DateEditor
                        readOnly={readOnly}
                        label={getMessage('startDateLabel')}
                        value={getAppointmentStartDate(changedAppointment)}
                        {...changeAppointment && {
                          onValueChange: changeAppointmentField(
                            isNew,
                            changeAddedAppointment,
                            changeAppointment,
                            setAppointmentStartDate,
                          ),
                        }}
                      />
                      <DateEditor
                        readOnly={readOnly}
                        label={getMessage('endDateLabel')}
                        value={getAppointmentEndDate(changedAppointment)}
                        {...changeAppointment && {
                          onValueChange: changeAppointmentField(
                            isNew,
                            changeAddedAppointment,
                            changeAppointment,
                            setAppointmentEndDate,
                          ),
                        }}
                      />
                      <AllDayEditor
                        readOnly={readOnly}
                        text={getMessage('allDayText')}
                        value={getAppointmentAllDay(changedAppointment)}
                        {...changeAppointment && {
                          onValueChange: changeAppointmentField(
                            isNew,
                            changeAddedAppointment,
                            changeAppointment,
                            setAppointmentAllDay,
                          ),
                        }}
                      />
                    </ScrollableSpace>
                    <StaticSpace>
                      <CommandButton
                        text={getMessage('cancelCommand')}
                        onExecute={() => {
                          this.toggleVisibility();
                          if (stopEditAppointment) {
                            if (isNew) {
                              cancelAddedAppointment();
                            } else {
                              stopEditAppointment();
                              cancelChangedAppointment();
                            }
                          }
                        }}
                        id={CANCEL_COMMAND_BUTTON}
                      />
                      {!readOnly && (
                        <CommandButton
                          text={getMessage('commitCommand')}
                          onExecute={() => {
                            this.toggleVisibility();
                            if (commitChangedAppointment) {
                              if (isNew) {
                                commitAddedAppointment();
                              } else {
                                commitChangedAppointment({
                                  appointmentId: getAppointmentId(changedAppointment),
                                });
                              }
                            }
                          }}
                          id={COMMIT_COMMAND_BUTTON}
                        />
                      )}
                    </StaticSpace>
                  </Container>
                </Popup>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="tooltip">
          {params => (
            <TemplateConnector>
              {({
                getAppointmentId,
              }, {
                startEditAppointment,
              }) => (
                <TemplatePlaceholder
                  params={{
                    ...params,
                    onOpenButtonClick: () => {
                      this.openFormHandler(params.appointmentMeta.data);
                      callActionIfExists(startEditAppointment, {
                        appointmentId: getAppointmentId(params.appointmentMeta.data),
                      });
                    },
                  }}
                />
              )}
            </TemplateConnector>
          )}
        </Template>

        <Template name="appointment">
          {params => (
            <TemplateConnector>
              {({
                getAppointmentId,
              }, {
                startEditAppointment,
              }) => (
                <TemplatePlaceholder
                  params={{
                    ...params,
                    onDoubleClick: () => {
                      this.openFormHandler(params.data);
                      callActionIfExists(startEditAppointment, {
                        appointmentId: getAppointmentId(params.data),
                      });
                    },
                  }}
                />)
              }
            </TemplateConnector>
          )}
        </Template>

        <Template name="cell">
          {params => (
            <TemplateConnector>
              {(getters, {
                addAppointment,
              }) => {
                const newAppointment = {
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
                        this.openFormHandler(newAppointment);
                        callActionIfExists(addAppointment, { appointment: newAppointment });
                      },
                    }}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

AppointmentForm.propTypes = {
  popupComponent: PropTypes.func.isRequired,
  dateEditorComponent: PropTypes.func.isRequired,
  textEditorComponent: PropTypes.func.isRequired,
  commandButtonComponent: PropTypes.func.isRequired,
  allDayEditorComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  scrollableSpaceContainer: PropTypes.func.isRequired,
  staticSpaceContainer: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  visible: PropTypes.bool,
  appointment: PropTypes.object,
  onVisibilityChange: PropTypes.func,
  onAppointmentChange: PropTypes.func,
  messages: PropTypes.shape({
    allDayText: PropTypes.string,
    titleLabel: PropTypes.string,
    startDateLabel: PropTypes.string,
    endDateLabel: PropTypes.string,
    commitCommand: PropTypes.string,
    cancelCommand: PropTypes.string,
  }),
};

AppointmentForm.defaultProps = {
  readOnly: false,
  visible: undefined,
  appointment: undefined,
  onVisibilityChange: () => undefined,
  onAppointmentChange: () => undefined,
  messages: {},
};

AppointmentForm.components = {
  popupComponent: 'Popup',
  containerComponent: 'Container',
  dateEditorComponent: 'DateEditor',
  textEditorComponent: 'TextEditor',
  commandButtonComponent: 'CommandButton',
  allDayEditorComponent: 'AllDayEditor',
  scrollableSpaceContainer: 'ScrollableSpace',
  staticSpaceContainer: 'StaticSpace',
};
