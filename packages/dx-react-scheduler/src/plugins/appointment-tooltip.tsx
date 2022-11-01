import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  createStateHelper,
  StateHelper,
  PluginComponents,
  Action,
} from '@devexpress/dx-react-core';
import {
  OPEN_COMMAND_BUTTON,
  CLOSE_COMMAND_BUTTON,
  DELETE_COMMAND_BUTTON,
  setAppointmentMeta,
  AppointmentMeta,
  TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY,
  getAppointmentResources,
} from '@devexpress/dx-scheduler-core';

import { AppointmentTooltipProps, AppointmentTooltipState, Appointments } from '../types';

const pluginDependencies = [
  { name: 'Appointments' },
  { name: 'EditingState', optional: true },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true },
];

const commandButtonIds = {
  open: OPEN_COMMAND_BUTTON,
  close: CLOSE_COMMAND_BUTTON,
  delete: DELETE_COMMAND_BUTTON,
};

class AppointmentTooltipBase extends React.PureComponent<
  AppointmentTooltipProps, AppointmentTooltipState
> {
  toggleVisibility: (payload?: any) => void;
  setAppointmentMeta: (appointmentMeta: AppointmentMeta) => void;
  onAppointmentClick: (appointmentMeta: AppointmentMeta) => void;

  static defaultProps: Partial<AppointmentTooltipProps> = {
    showOpenButton: false,
    showDeleteButton: false,
    showCloseButton: false,
  };
  static components: PluginComponents = {
    layoutComponent: 'Layout',
    headerComponent: 'Header',
    contentComponent: 'Content',
    commandButtonComponent: 'CommandButton',
    recurringIconComponent: 'RecurringIcon',
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      appointmentMeta: props.appointmentMeta,
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        visible: () => {
          const { onVisibilityChange } = this.props;
          return onVisibilityChange;
        },
        appointmentMeta: () => {
          const { onAppointmentMetaChange } = this.props;
          return onAppointmentMetaChange;
        },
      },
    );

    const toggleVisibility = () => {
      const { visible: isOpen } = this.state;
      return !isOpen;
    };
    this.toggleVisibility = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisibility);
    this.setAppointmentMeta = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentMeta', setAppointmentMeta);
    this.onAppointmentClick = ({ target, data }) => {
      this.setAppointmentMeta({ target, data });
      this.toggleVisibility();
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      visible = prevState.visible,
      appointmentMeta = prevState.appointmentMeta,
    } = nextProps;
    return {
      appointmentMeta,
      visible,
    };
  }

  render() {
    const {
      showOpenButton,
      showDeleteButton,
      showCloseButton,
      layoutComponent: Layout,
      headerComponent,
      contentComponent,
      commandButtonComponent,
      recurringIconComponent,
    } = this.props;
    const { visible, appointmentMeta } = this.state;

    return (
      <Plugin
        name="AppointmentTooltip"
        dependencies={pluginDependencies}
      >
        <Action name={TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY} action={this.toggleVisibility} />

        <Template name="timeTable">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              formatDate, resources, plainResources,
            }, {
              finishDeleteAppointment, openDeleteConfirmationDialog,
            }) => {
              const onDeleteButtonClick = () => {
                if(!finishDeleteAppointment) {
                  return;
                }
                if (openDeleteConfirmationDialog) {
                  openDeleteConfirmationDialog({
                    hideActionName: TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY,
                    appointmentData: appointmentMeta.data,
                  });
                } else {
                  this.toggleVisibility();
                  finishDeleteAppointment(appointmentMeta.data);
                }
              };
              return (
                <TemplatePlaceholder
                  name="tooltip"
                  params={{
                    commandButtonComponent,
                    recurringIconComponent,
                    showOpenButton,
                    showDeleteButton,
                    showCloseButton,
                    headerComponent,
                    contentComponent,
                    appointmentMeta,
                    appointmentResources: appointmentMeta ? getAppointmentResources(
                      appointmentMeta.data as any, resources, plainResources,
                    ) : [],
                    visible,
                    onHide: this.toggleVisibility,
                    commandButtonIds,
                    onDeleteButtonClick,
                    formatDate,
                  }}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="tooltip">
          {(params: any) => <Layout {...params} />}
        </Template>

        <Template name="appointment">
          {(params: Appointments.AppointmentProps) => (
            <TemplatePlaceholder
              params={{
                ...params,
                onClick: ({ target, data }) =>
                 this.onAppointmentClick({ target, data }),
              }}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

// tslint:disable: max-line-length
/** The AppointmentTooltip plugin allows you to display information about an appointment in a tooltip. */
export const AppointmentTooltip: React.ComponentType<AppointmentTooltipProps> = AppointmentTooltipBase;
