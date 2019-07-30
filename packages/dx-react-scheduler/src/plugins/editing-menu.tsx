import * as React from 'react';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector, Action, Getters, Actions,
} from '@devexpress/dx-react-core';
import {
  CURRENT,
  CURRENT_FOLLOWING,
  ALL,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'EditingState' },
];

const availableOperations = [
  { value: CURRENT, title: 'This event' },
  { value: CURRENT_FOLLOWING, title: 'This and following events' },
  { value: ALL, title: 'All events' },
];

class EditingMenuBase extends React.PureComponent {
  static components = {
    layoutComponent: 'Layout',
    modalComponent: 'Modal',
    buttonComponent: 'Button',
    containerComponent: 'Container',
  };

  modalContainer = React.createRef();

  state = {
    isOpen: false,
    isEditing: false,
    isDeleting: false,
  };

  finishCommitAppointment = (
    payload,
    { editingAppointment }: Getters,
    { commitChangedAppointment }: Actions,
  ) => {
    if (editingAppointment && !editingAppointment.rRule) {
      commitChangedAppointment();
    } else {
      this.setState({ isOpen: true, isEditing: true, isDeleting: false });
    }
  }

  finishDeleteAppointment = (
    payload,
    { editingAppointment }: Getters,
    { commitDeletedAppointment }: Actions,
  ) => {
    if (editingAppointment && !editingAppointment.rRule) {
      commitDeletedAppointment();
    } else {
      this.setState({ isOpen: true, isDeleting: true, isEditing: false });
    }
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const {
      isEditing, isDeleting, isOpen,
    } = this.state;
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
            {({ editingAppointment }, { commitChangedAppointment, commitDeletedAppointment }) => {
              const commitFunction = isEditing ?
                commitChangedAppointment : commitDeletedAppointment;

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

/***
 * The EditingMenu plugin.
 * */
export const EditingMenu: React.ComponentType = EditingMenuBase;
