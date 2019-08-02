import * as React from 'react';
import { memoize, getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector, Action, Getters, Actions,
} from '@devexpress/dx-react-core';
import {
  CURRENT,
  CURRENT_FOLLOWING,
  ALL,
} from '@devexpress/dx-scheduler-core';
import { EditingMenuProps, EditingMenuState } from '../types';

const pluginDependencies = [
  { name: 'EditingState' },
];

const defaultAvailableOperations = [
  { value: CURRENT },
  { value: CURRENT_FOLLOWING },
  { value: ALL },
];

const defaultMessages = {
  [CURRENT]: 'This event',
  [CURRENT_FOLLOWING]: 'This and following events',
  [ALL]: 'All events',
};

class EditingMenuBase extends React.PureComponent<EditingMenuProps, EditingMenuState> {
  static components = {
    layoutComponent: 'Layout',
    modalComponent: 'Modal',
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
    debugger
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

  commit = memoize((editComputed, deleteComputed, payload) => {
    if (payload) {
      return type => deleteComputed({ deletedAppointmentData: payload, type });
    }
    return type => editComputed(type);
  });

  closeMenu = () => {
    this.setState({ isOpen: false, deletedAppointmentData: null });
  }

  availableOperations = memoize((messages) => {
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    return defaultAvailableOperations.map(({ value }) => ({
      value,
      title: getMessage([value]),
    }));
  });

  render() {
    const { isOpen, deletedAppointmentData } = this.state;
    const {
      layoutComponent: Layout,
      modalComponent: Modal,
      containerComponent: Container,
      buttonComponent,
      messages,
    } = this.props;

    const availableOperations = this.availableOperations(messages);

    return (
      <Plugin
        name="EditingMenu"
        dependencies={pluginDependencies}
      >
        <Action name="finishCommitAppointment" action={this.finishCommitAppointment} />
        <Action name="finishDeleteAppointment" action={this.finishDeleteAppointment} />

        <Template name="schedulerRoot">
          <TemplatePlaceholder />
          <Container containerRef={this.modalContainer} />
          <TemplatePlaceholder name="modal" />
        </Template>

        <Template name="modal">
          <TemplateConnector>
            {(getters, { commitChangedAppointment, commitDeletedAppointment }) => {
              const commit = this.commit(
                commitChangedAppointment, commitDeletedAppointment, deletedAppointmentData,
              );

              return (
                <Modal
                  containerRef={this.modalContainer}
                  open={isOpen}
                  onClose={this.closeMenu}
                  onBackdropClick={this.closeMenu}
                >
                  <Layout
                    buttonComponent={buttonComponent}
                    handleClose={this.closeMenu}
                    commit={commit}
                    availableOperations={availableOperations}
                  />
                </Modal>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/*** The EditingMenu plugin that provides a capability to edit recurrence appointments */
export const EditingMenu: React.ComponentType<EditingMenuProps> = EditingMenuBase;
