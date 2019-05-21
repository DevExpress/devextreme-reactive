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
  COMMIT_COMMAND_BUTTON,
  CANCEL_COMMAND_BUTTON,
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
};

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
    popupComponent: 'Popup',
    containerComponent: 'Container',
    startDateComponent: 'StartDateEditor',
    endDateComponent: 'EndDateEditor',
    titleComponent: 'TitleEditor',
    allDayComponent: 'AllDayEditor',
    commandButtonComponent: 'CommandButton',
    scrollableAreaComponent: 'ScrollableArea',
    staticAreaComponent: 'StaticArea',
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
      allDayComponent: AllDayEditor,
      containerComponent: Container,
      scrollableAreaComponent: ScrollableArea,
      staticAreaComponent: StaticArea,
      popupComponent: Popup,
      startDateComponent: StartDateEditor,
      endDateComponent: EndDateEditor,
      titleComponent: TitleEditor,
      commandButtonComponent: CommandButton,
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
        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
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
                ...appointmentData,
                ...isNew ? addedAppointment : appointmentChanges,
              };
              const changeAppointmentField = isNew
                ? changeAddedAppointment
                : changeAppointment;

              return (
                <Popup
                  visible={visible}
                >
                  <Container>
                    <ScrollableArea>
                      <TitleEditor
                        readOnly={readOnly}
                        label={getMessage('titleLabel')}
                        value={changedAppointment.title}
                        {...changeAppointment && {
                          onValueChange: title => changeAppointmentField({ change: { title } }),
                        }}
                      />
                      <StartDateEditor
                        readOnly={readOnly}
                        label={getMessage('startDateLabel')}
                        value={changedAppointment.startDate}
                        {...changeAppointment && {
                          onValueChange:
                            startDate => changeAppointmentField({ change: { startDate } }),
                        }}
                      />
                      <EndDateEditor
                        readOnly={readOnly}
                        label={getMessage('endDateLabel')}
                        value={changedAppointment.endDate}
                        {...changeAppointment && {
                          onValueChange: endDate => changeAppointmentField({ change: { endDate } }),
                        }}
                      />
                      <AllDayEditor
                        readOnly={readOnly}
                        text={getMessage('allDayLabel')}
                        value={changedAppointment.allDay}
                        {...changeAppointment && {
                          onValueChange: allDay => changeAppointmentField({ change: { allDay } }),
                        }}
                      />
                    </ScrollableArea>
                    <StaticArea>
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
                                  appointmentId: changedAppointment.id,
                                });
                              }
                            }
                          }}
                          id={COMMIT_COMMAND_BUTTON}
                        />
                      )}
                    </StaticArea>
                  </Container>
                </Popup>
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
                        callActionIfExists(addAppointment, { appointmentData: newAppointmentData });
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

// tslint:disable-next-line: max-line-length
/** The AppointmentForm plugin renders a form that visualizes appointment’s data and allows a user to modify this data. */
export const AppointmentForm: React.ComponentType<AppointmentFormProps> = AppointmentFormBase;
