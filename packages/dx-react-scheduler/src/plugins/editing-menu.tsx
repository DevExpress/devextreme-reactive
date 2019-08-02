import * as React from 'react';
import { memoize } from '@devexpress/dx-core';
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

const availableOperations = [
  { value: CURRENT, title: 'This event' },
  { value: CURRENT_FOLLOWING, title: 'This and following events' },
  { value: ALL, title: 'All events' },
];

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

  commitFunction = memoize((editComputed, deleteComputed, payload) => {
    if (payload) {
      return type => deleteComputed({ deletedAppointmentData: payload, type });
    }
    return type => editComputed(type);
  });

  closeMenu = () => {
    this.setState({
      isOpen: false,
      deletedAppointmentData: null,
    });
  }

  render() {
    const { isOpen, deletedAppointmentData } = this.state;
    const {
      layoutComponent: Layout,
      modalComponent: Modal,
      containerComponent: Container,
      buttonComponent,
      messages,
    } = this.props;

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
              const commitFunction = this.commitFunction(
                commitChangedAppointment, commitDeletedAppointment, deletedAppointmentData,
              );

              return (
                <Modal
                  container={this.modalContainer}
                  open={isOpen}
                  onClose={this.closeMenu}
                  onBackdropClick={this.closeMenu}
                >
                  <Layout
                    buttonComponent={buttonComponent}
                    handleClose={this.closeMenu}
                    commit={commitFunction}
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

/*** The EditingMenu plugin. */
export const EditingMenu: React.ComponentType<EditingMenuProps> = EditingMenuBase;
