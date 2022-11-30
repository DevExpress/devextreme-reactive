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
import { AppointmentModel } from '@devexpress/dx-scheduler-core';

const defaultMessages = {
  discardButton: 'Discard',
  deleteButton: 'Delete',
  cancelButton: 'Cancel',
  confirmDeleteMessage: 'Are you sure you want to delete this appointment?',
  confirmCancelMessage: 'Discard unsaved changes?',
};

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true },
];

const ACTION_TYPES = {
  CANCEL: 'cancel',
  DELETE: 'delete',
};

const ConfirmationDialogBase: React.FunctionComponent<ConfirmationDialogProps> & {components: {
  overlayComponent: string, containerComponent: string,
  layoutComponent: string, buttonComponent: string,
}} = ({
  messages, overlayComponent: Overlay, layoutComponent: Layout, containerComponent: Container,
  buttonComponent, ignoreDelete, ignoreCancel,
}) => {
  const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
  const modalContainer = React.useRef();

  const [visible, setVisible] = React.useState(false);
  const [actionType, setActionType] = React.useState('');
  const [hideActionName, setHideActionName] = React.useState('');
  const [appointmentData, setAppointmentData] = React.useState({});

  const toggleVisibility = React.useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);

  const confirmCancelChanges = React.useCallback((hideAction) => {
    toggleVisibility();
    setHideActionName(hideAction);
    setActionType(ACTION_TYPES.CANCEL);
  }, [toggleVisibility, setHideActionName, setActionType]);

  const confirmDelete = React.useCallback(({
    hideActionName: hideAction, appointmentData: changedAppointment,
  }) => {
    toggleVisibility();
    setHideActionName(hideAction);
    setActionType(ACTION_TYPES.DELETE);
    setAppointmentData(changedAppointment);
  }, [toggleVisibility, setHideActionName, setActionType, setAppointmentData]);

  const confirmAction = React.useCallback((
    isNewAppointment, hideEditor, stopEditAppointment, finishDeleteAppointment,
    cancelAddedAppointment, cancelChangedAppointment,
  ) => () => {
    hideEditor();
    toggleVisibility();
    if (isNewAppointment) {
      cancelAddedAppointment();
    } else {
      stopEditAppointment();
      cancelChangedAppointment();
    }
    if (actionType === ACTION_TYPES.DELETE) {
      finishDeleteAppointment(appointmentData);
    }
  }, [toggleVisibility, actionType, appointmentData]);

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
                visible={visible}
                onHide={toggleVisibility}
              >
                <Layout
                  buttonComponent={buttonComponent}
                  handleCancel={toggleVisibility}
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
