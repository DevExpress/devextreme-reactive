import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
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
  confirmButton: 'Do not save',
  cancelButton: 'Cancel',
};

const pluginDependencies = [
  { name: 'EditingState' },
];

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
    caller: undefined,
  };

  openConfirmationDialog = () => {
    this.setState({ isOpen: true });
  }

  closeConfirmationDialog = () => {
    this.setState({ isOpen: false });
  }

  confirmCancelChanges = (caller) => {
    this.openConfirmationDialog();
    this.setState({ caller, actionType: 'cancel' });
  }

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
        <Template name="schedulerRoot">
          <TemplatePlaceholder />
          <Container ref={this.modalContainer} />
          <TemplatePlaceholder name="confirmationDialogOverlay" />
        </Template>

        <Template name="confirmationDialogOverlay">
          <TemplateConnector>
            {(getters, {
              closeAppointmentForm,
              closeAppointmentTooltip,
            }) => {
              const confirm = () => {
                [`close${caller}`]();
                this.closeConfirmationDialog();
              }
              console.log(isOpen)

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
                    isDeleting={actionType === 'delete'}
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
