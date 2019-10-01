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

  modalContainer = React.createRef();

  state = {
    isOpen: false,
    actionType: undefined,
    caller: '',
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

  confirmDelete = memoize((caller) => {
    this.openConfirmationDialog();
    this.setState({ caller, actionType: ACTION_TYPES.DELETE });
  });

  render() {
    const {
      messages,
      overlayComponent: Overlay,
      layoutComponent: Layout,
      containerComponent: Container,
      buttonComponent,
    } = this.props;
    const { isOpen, actionType, caller } = this.state;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="ConfirmationDialog"
        dependencies={pluginDependencies}
      >
        <Action name="confirmCancelChanges" action={this.confirmCancelChanges} />
        <Action name="confirmDelete" action={this.confirmDelete} />

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
              cancelAddedAppointment,
              stopEditAppointment,
            }) => {
              const confirm = () => {
                switch (caller) {
                  case 'AppointmentForm':
                    closeAppointmentForm();
                    break;
                  case 'AppointmentTooltup':
                    closeAppointmentTooltip();
                    break;
                }
                this.closeConfirmationDialog();
                //const isAppointmentNew = !editingAppointment;
              };

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
