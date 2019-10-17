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
import { callActionIfExists, AppointmentModel } from '@devexpress/dx-scheduler-core';

const defaultMessages = {
  discardButton: 'Discard',
  deleteButton: 'Delete',
  cancelButton: 'Cancel',
  confirmDeleteMessage: 'Are you sure you want to delete this appointment?',
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
}} = ({
  messages, overlayComponent: Overlay, layoutComponent: Layout, containerComponent: Container,
  buttonComponent, ignoreDelete, ignoreCancel,
}) => {
  const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
  const modalContainer = React.useRef();

  const [isOpen, setIsOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState('');
  const [hideActionName, setHideActionName] = React.useState('');
  const [appointmentData, setAppointmentData] = React.useState({});

  const toggleIsOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const confirmCancelChanges = React.useCallback((hideAction) => {
    toggleIsOpen();
    setHideActionName(hideAction);
    setActionType(ACTION_TYPES.CANCEL);
  }, [toggleIsOpen, setHideActionName, setActionType]);

  const confirmDelete = React.useCallback(({
    hideActionName: hideAction, appointmentData: changedAppointment,
  }) => {
    toggleIsOpen();
    setHideActionName(hideAction);
    setActionType(ACTION_TYPES.DELETE);
    setAppointmentData(changedAppointment);
  }, [toggleIsOpen, setHideActionName, setActionType, setAppointmentData]);

  const confirmAction = React.useCallback((
    isNewAppointment, hideEditor, stopEditAppointment, finishDeleteAppointment,
    cancelAddedAppointment, cancelChangedAppointment,
  ) => () => {
    hideEditor();
    toggleIsOpen();
    if (isNewAppointment) {
      callActionIfExists(cancelAddedAppointment, appointmentData);
    } else {
      callActionIfExists(stopEditAppointment, appointmentData);
      callActionIfExists(cancelChangedAppointment, appointmentData);
    }
    if (actionType === ACTION_TYPES.DELETE && finishDeleteAppointment) {
      finishDeleteAppointment(appointmentData);
    }
  }, [toggleIsOpen, actionType, appointmentData]);

  return (
    <Plugin
      name="ConfirmationDialog"
      dependencies={pluginDependencies}
    >
      {!ignoreCancel &&
        <Action name="openCancelConfirmationDialog" action={confirmCancelChanges} />
      }
      {!ignoreDelete &&
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
          }, actions) => {
            const handleConfirm = confirmAction(
              !editingAppointment, actions[hideActionName], actions.stopEditAppointment,
              actions.finishDeleteAppointment, actions.cancelAddedAppointment,
              actions.cancelChangedAppointment,
            );

            return (
              <Overlay
                target={modalContainer}
                visible={isOpen}
                onHide={toggleIsOpen}
              >
                <Layout
                  buttonComponent={buttonComponent}
                  handleCancel={toggleIsOpen}
                  handleConfirm={handleConfirm}
                  getMessage={getMessage}
                  isDeleting={actionType === ACTION_TYPES.DELETE}
                  appointmentData={appointmentData as AppointmentModel}
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
  ignoreCancel: false,
  ignoreDelete: false,
};

// tslint:disable-next-line: max-line-length
/** A plugin that renders the dialog which allows users to confirm or to discard delete and cancel appointment actions. */
export const ConfirmationDialog: React.ComponentType<
  ConfirmationDialogProps
> = ConfirmationDialogBase;
