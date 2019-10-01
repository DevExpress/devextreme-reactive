import * as React from 'react';
import { getMessagesFormatter, memoize } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
  Action,
} from '@devexpress/dx-react-core';
import { ConfirmationDialogProps, ConfirmationDialogState } from '../types/editing/confirmation-dialog.types';
import { APPOINTMENT_FORM } from '@devexpress/dx-scheduler-core';

const defaultMessages = {
  discardButton: 'Discard',
  deleteButton: 'Delete',
  cancelButton: 'Cancel',
  confirmDeleteMeesage: 'Do you really want to delete this appointment?',
  confirmCancelMessage: 'Discard unsaved changes?',
};

const pluginDependencies = [
  { name: 'EditingState' },
];

const ACTION_TYPES = {
  CANCEL: 'cancel',
  DELETE: 'delete',
};

class ConfirmationDialogBase extends React.PureComponent<
  ConfirmationDialogProps, ConfirmationDialogState
> {
  static components: PluginComponents = {
    overlayComponent: 'Overlay',
    layoutComponent: 'Layout',
    buttonComponent: 'Button',
    containerComponent: 'Container',
  };

  static defaultProps: Partial<ConfirmationDialogProps> = {
    doNotOpenOnDelete: false,
    doNotOpenOnCancel: false,
  };

  modalContainer = React.createRef();

  state = {
    isOpen: false,
    actionType: undefined,
    caller: '',
    appointmentData: {},
  };

  openConfirmationDialog = () => {
    this.setState({ isOpen: true });
  }

  closeConfirmationDialog = () => {
    this.setState({ isOpen: false });
  }

  confirmCancelChanges = memoize((caller) => {
    this.openConfirmationDialog();
    this.setState({ caller, actionType: ACTION_TYPES.CANCEL });
  });

  confirmDelete = memoize(({ caller, appointmentData }) => {
    this.openConfirmationDialog();
    this.setState({ caller, appointmentData, actionType: ACTION_TYPES.DELETE });
  });

  confirmAction = memoize((
    isAppointmentNew, closeCaller, stopEditAppointment, finishDeleteAppointment,
  ) => () => {
    const { actionType, appointmentData } = this.state;
    closeCaller();
    this.closeConfirmationDialog();
    if (actionType === ACTION_TYPES.DELETE && finishDeleteAppointment) {
      finishDeleteAppointment(appointmentData);
    }
    if (!isAppointmentNew && stopEditAppointment) {
      stopEditAppointment();
    }
  });

  render() {
    const {
      messages,
      overlayComponent: Overlay,
      layoutComponent: Layout,
      containerComponent: Container,
      buttonComponent,
      doNotOpenOnDelete,
      doNotOpenOnCancel,
    } = this.props;
    const { isOpen, actionType, caller } = this.state;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="ConfirmationDialog"
        dependencies={pluginDependencies}
      >
        {!doNotOpenOnCancel &&
          <Action name="confirmCancelChanges" action={this.confirmCancelChanges} />
        }
        {!doNotOpenOnDelete &&
          <Action name="confirmDelete" action={this.confirmDelete} />
        }

        <Template name="schedulerRoot">
          <TemplatePlaceholder />
          <Container ref={this.modalContainer} />
          <TemplatePlaceholder name="confirmationDialogOverlay" />
        </Template>

        <Template name="confirmationDialogOverlay">
          <TemplateConnector>
            {({
              editingAppointment,
            }, {
              closeAppointmentForm,
              closeAppointmentTooltip,
              stopEditAppointment,
              finishDeleteAppointment,
            }) => {
              const closeCaller = caller === APPOINTMENT_FORM ?
                closeAppointmentForm : closeAppointmentTooltip;
              const confirm = this.confirmAction(
                !editingAppointment, closeCaller, stopEditAppointment, finishDeleteAppointment,
              );

              return (
                <Overlay
                  target={this.modalContainer}
                  visible={isOpen}
                  onHide={this.closeConfirmationDialog}
                >
                  <Layout
                    buttonComponent={buttonComponent}
                    handleClose={this.closeConfirmationDialog}
                    confirm={confirm}
                    getMessage={getMessage}
                    isDeleting={actionType === ACTION_TYPES.DELETE}
                  />
                </Overlay>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
export const ConfirmationDialog: React.ComponentType<
  ConfirmationDialogProps
> = ConfirmationDialogBase;
