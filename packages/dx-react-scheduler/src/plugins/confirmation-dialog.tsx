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
import { APPOINTMENT_FORM, callActionIfExists, AppointmentModel } from '@devexpress/dx-scheduler-core';

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
}} = (props) => {
  const {
    messages, overlayComponent: Overlay, layoutComponent: Layout, containerComponent: Container,
    buttonComponent, doNotOpenOnDelete, doNotOpenOnCancel,
  } = props;
  const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
  const modalContainer = React.useRef();

  const [isOpen, setIsOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState('');
  const [editingPlugin, setEditingPlugin] = React.useState('');
  const [appointmentData, setAppointmentData] = React.useState({});

  const toggleIsOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const confirmCancelChanges = React.useCallback((pluginName) => {
    toggleIsOpen();
    setEditingPlugin(pluginName);
    setActionType(ACTION_TYPES.CANCEL);
  }, [toggleIsOpen, setEditingPlugin, setActionType]);

  const confirmDelete = React.useCallback(({
    pluginName, appointmentData: changedAppointment,
  }) => {
    toggleIsOpen();
    setEditingPlugin(pluginName);
    setActionType(ACTION_TYPES.DELETE);
    setAppointmentData(changedAppointment);
  }, [toggleIsOpen, setEditingPlugin, setActionType, setAppointmentData]);

  const confirmAction = React.useCallback((
    isNewAppointment, closeEditingPlugin, stopEditAppointment, finishDeleteAppointment,
    cancelAddedAppointment, cancelChangedAppointment,
  ) => () => {
    closeEditingPlugin();
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
            toggleAppointmentFormVisibility,
            toggleAppointmentTooltipVisibility,
            stopEditAppointment,
            finishDeleteAppointment,
            cancelAddedAppointment,
            cancelChangedAppointment,
          }) => {
            const closeEditingPlugin = editingPlugin === APPOINTMENT_FORM ?
              toggleAppointmentFormVisibility : toggleAppointmentTooltipVisibility;
            const confirm = confirmAction(
              !editingAppointment, closeEditingPlugin, stopEditAppointment,
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
  doNotOpenOnDelete: false,
  doNotOpenOnCancel: false,
};

// tslint:disable-next-line: max-line-length
/** A plugin that renders the dialog which allows users to confirm or to discard delete and cancel appointment actions. */
export const ConfirmationDialog: React.ComponentType<
  ConfirmationDialogProps
> = ConfirmationDialogBase;
