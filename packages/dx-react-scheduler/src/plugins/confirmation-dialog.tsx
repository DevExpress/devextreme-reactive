import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Action,
} from '@devexpress/dx-react-core';
import { ConfirmationDialogProps } from '../types/editing/confirmation-dialog.types';
import { APPOINTMENT_FORM, callActionIfExists } from '@devexpress/dx-scheduler-core';

const defaultMessages = {
  discardButton: 'Discard',
  deleteButton: 'Delete',
  cancelButton: 'Cancel',
  confirmDeleteMeesage: 'Are you sure you want to delete this appointment?',
  confirmCancelMessage: 'Discard unsaved changes?',
};

const pluginDependencies = [
  { name: 'EditingState' },
];

const ACTION_TYPES = {
  CANCEL: 'cancel',
  DELETE: 'delete',
};

const ConfirmationDialogBase: React.SFC<ConfirmationDialogProps> & {components: {
  overlayComponent: string, containerComponent: string,
  layoutComponent: string, buttonComponent: string,
}} = (props) => {
  const {
    messages, overlayComponent: Overlay, layoutComponent: Layout, containerComponent: Container,
    buttonComponent, doNotOpenOnDelete, doNotOpenOnCancel,
  } = props;
  const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
  const modalContainer = React.useRef();

  const [isOpen, setIsOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState('');
  const [pluginToClose, setPluginToClose] = React.useState('');
  const [appointmentData, setAppointmentData] = React.useState({});

  const toggleIsOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const confirmCancelChanges = React.useCallback((pluginName) => {
    toggleIsOpen();
    setPluginToClose(pluginName);
    setActionType(ACTION_TYPES.CANCEL);
  }, [toggleIsOpen, setPluginToClose, setActionType]);
  const confirmDelete = React.useCallback(({
    pluginName, appointmentData: changedAppointment,
  }) => {
    toggleIsOpen();
    setPluginToClose(pluginName);
    setActionType(ACTION_TYPES.DELETE);
    setAppointmentData(changedAppointment);
  }, [toggleIsOpen, setPluginToClose, setActionType, setAppointmentData]);

  const confirmAction = React.useCallback((
    isNewAppointment, closeCallingPlugin, stopEditAppointment, finishDeleteAppointment,
    cancelAddedAppointment, cancelChangedAppointment,
  ) => () => {
    closeCallingPlugin();
    toggleIsOpen();
    if (actionType === ACTION_TYPES.DELETE && finishDeleteAppointment) {
      finishDeleteAppointment(appointmentData);
    } else {
      if (isNewAppointment) {
        callActionIfExists(cancelAddedAppointment, appointmentData);
      } else {
        callActionIfExists(stopEditAppointment, appointmentData);
        callActionIfExists(cancelChangedAppointment, appointmentData);
      }
    }
  }, [toggleIsOpen, actionType, appointmentData]);

  return (
    <Plugin
      name="ConfirmationDialog"
      dependencies={pluginDependencies}
    >
      {!doNotOpenOnCancel &&
        <Action name="openCancelConfirmationDialog" action={confirmCancelChanges} />
      }
      {!doNotOpenOnDelete &&
        <Action name="openDeleteConfirmationDialog" action={confirmDelete} />
      }

      <Template name="schedulerRoot">
        <TemplatePlaceholder />
        <Container ref={modalContainer} />
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
            cancelAddedAppointment,
            cancelChangedAppointment,
          }) => {
            const closeCallingPlugin = pluginToClose === APPOINTMENT_FORM ?
              closeAppointmentForm : closeAppointmentTooltip;
            const confirm = confirmAction(
              !editingAppointment, closeCallingPlugin, stopEditAppointment,
              finishDeleteAppointment, cancelAddedAppointment, cancelChangedAppointment,
            );

            return (
              <Overlay
                target={modalContainer}
                visible={isOpen}
                onHide={toggleIsOpen}
              >
                <Layout
                  buttonComponent={buttonComponent}
                  handleClose={toggleIsOpen}
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
};

ConfirmationDialogBase.components = {
  overlayComponent: 'Overlay',
  containerComponent: 'Container',
  layoutComponent: 'Layout',
  buttonComponent: 'Button',
};

ConfirmationDialogBase.defaultProps = {
  doNotOpenOnDelete: false,
  doNotOpenOnCancel: false,
};

/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
export const ConfirmationDialog: React.ComponentType<
  ConfirmationDialogProps
> = ConfirmationDialogBase;
