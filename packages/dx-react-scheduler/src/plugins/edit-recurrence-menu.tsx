import * as React from 'react';
import { memoize, getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector, Action, Getters, Actions,
} from '@devexpress/dx-react-core';
import { RECURRENCE } from '@devexpress/dx-scheduler-core';
import { EditRecurrenceMenuProps, EditRecurrenceMenuState } from '../types';

const pluginDependencies = [
  { name: 'EditingState' },
];

const defaultAvailableOperations = [
  { value: RECURRENCE.CURRENT },
  { value: RECURRENCE.CURRENT_AND_FOLLOWING },
  { value: RECURRENCE.ALL },
];

const defaultMessages = {
  [RECURRENCE.CURRENT]: 'This appointment',
  [RECURRENCE.CURRENT_AND_FOLLOWING]: 'This and following appointments',
  [RECURRENCE.ALL]: 'All appointments',
  menuEditTitle: 'Edit recurring appointment',
  menuDeleteTitle: 'Delete recurring appointment',
  cancelButton: 'Cancel',
  commitButton: 'OK',
};

class EditRecurrenceMenuBase extends React.PureComponent<
  EditRecurrenceMenuProps, EditRecurrenceMenuState
> {
  static components = {
    layoutComponent: 'Layout',
    overlayComponent: 'Overlay',
    buttonComponent: 'Button',
    containerComponent: 'Container',
  };

  modalContainer = React.createRef();

  state = {
    isOpen: false,
    deletedAppointmentData: null,
  };

  finishCommitAppointment = (
    payload,
    { editingAppointment }: Getters,
    { commitChangedAppointment }: Actions,
  ) => {
    if (editingAppointment && !editingAppointment.rRule) {
      commitChangedAppointment();
    } else {
      this.setState({
        isOpen: true, deletedAppointmentData: null,
      });
    }
  }

  finishDeleteAppointment = (
    payload,
    getters,
    { commitDeletedAppointment }: Actions,
  ) => {
    if (payload && !payload.rRule) {
      commitDeletedAppointment({ deletedAppointmentData: payload });
    } else {
      this.setState({
        isOpen: true, deletedAppointmentData: payload,
      });
    }
  }

  commit = memoize((editAction, deleteAction, payload) => {
    if (payload) {
      return type => deleteAction({ deletedAppointmentData: payload, type });
    }
    return type => editAction(type);
  });

  closeMenu = () => {
    this.setState({ isOpen: false, deletedAppointmentData: null });
  }

  availableOperations = memoize((getMessage, menuAvailableOperations) =>
    menuAvailableOperations.map(({ value }) => ({
      value,
      title: getMessage([value]),
    })));

  getMessage = memoize((messages, menuMessages) =>
    getMessagesFormatter({ ...menuMessages, ...messages }));

  render() {
    const { isOpen, deletedAppointmentData } = this.state;
    const {
      layoutComponent: Layout,
      overlayComponent: Overlay,
      containerComponent: Container,
      buttonComponent,
      messages,
    } = this.props;

    const getMessage = this.getMessage(messages, defaultMessages);
    const availableOperations = this.availableOperations(getMessage, defaultAvailableOperations);

    return (
      <Plugin
        name="EditRecurrenceMenu"
        dependencies={pluginDependencies}
      >
        <Action name="finishCommitAppointment" action={this.finishCommitAppointment} />
        <Action name="finishDeleteAppointment" action={this.finishDeleteAppointment} />

        <Template name="schedulerRoot">
          <TemplatePlaceholder />
          <Container target={this.modalContainer} />
          <TemplatePlaceholder name="overlay" />
        </Template>

        <Template name="overlay">
          <TemplateConnector>
            {(getters, { commitChangedAppointment, commitDeletedAppointment }) => {
              const commit = this.commit(
                commitChangedAppointment, commitDeletedAppointment, deletedAppointmentData,
              );

              return (
                <Overlay
                  target={this.modalContainer}
                  visible={isOpen}
                  onHide={this.closeMenu}
                >
                  <Layout
                    isDeleting={!!deletedAppointmentData}
                    buttonComponent={buttonComponent}
                    handleClose={this.closeMenu}
                    commit={commit}
                    availableOperations={availableOperations}
                    getMessage={getMessage}
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

/**
 * A plugin that renders the Scheduler's edit menu.
 * Should not be used with the `IntegratedEditing` plugin.
 */
export const EditRecurrenceMenu: React.ComponentType<
  EditRecurrenceMenuProps
> = EditRecurrenceMenuBase;
