import * as React from 'react';
import {
  Action, Plugin, Getter, createStateHelper, StateHelper,
} from '@devexpress/dx-react-core';
import {
  addAppointment,
  cancelAddedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
  changedAppointmentById,
} from '@devexpress/dx-scheduler-core';

import { EditingStateProps, EditingStateState } from '../types';

class EditingStateBase extends React.PureComponent<EditingStateProps, EditingStateState> {
  static defaultProps = {
    editingAppointmentId: undefined,
    defaultEditingAppointmentId: undefined,
    onEditingAppointmentIdChange: undefined,

    appointmentChanges: undefined,
    defaultAppointmentChanges: {},
    onAppointmentChangesChange: undefined,

    addedAppointment: undefined,
    defaultAddedAppointment: {},
    onAddedAppointmentChange: undefined,
  };
  startEditAppointment: (payload: any) => void;;
  stopEditAppointment: (payload?: any) => void;;
  changeAppointment: (payload: any) => void;;
  cancelChangedAppointment: (payload?: any) => void;;
  commitChangedAppointment: (payload: any) => void;;
  addAppointment: (payload: any) => void;;
  changeAddedAppointment: (payload: any) => void;;
  cancelAddedAppointment: (payload?: any) => void;;
  commitAddedAppointment: (payload: any) => void;;
  commitDeletedAppointment: (payload: any) => void;;

  constructor(props) {
    super(props);

    this.state = {
      editingAppointmentId: props.editingAppointmentId || props.defaultEditingAppointmentId,
      addedAppointment: props.addedAppointment || props.defaultAddedAppointment,
      appointmentChanges: props.appointmentChanges || props.defaultAppointmentChanges,
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        editingAppointmentId: () => {
          const { onEditingAppointmentIdChange } = this.props;
          return onEditingAppointmentIdChange;
        },
        addedAppointment: () => {
          const { onAddedAppointmentChange } = this.props;
          return onAddedAppointmentChange;
        },
        appointmentChanges: () => {
          const { onAppointmentChangesChange } = this.props;
          return onAppointmentChangesChange;
        },
      },
    );

    this.startEditAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingAppointmentId', startEditAppointment);
    this.stopEditAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingAppointmentId', stopEditAppointment);

    this.changeAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', changeAppointment);
    this.cancelChangedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', cancelChanges);
    this.commitChangedAppointment = ({ appointmentId }) => {
      const { onCommitChanges } = this.props;
      const { appointmentChanges } = this.state;
      onCommitChanges({
        changed: changedAppointmentById(appointmentChanges, appointmentId),
      });
      this.cancelChangedAppointment();
      this.stopEditAppointment();
    };

    this.addAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', addAppointment);
    this.changeAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', changeAppointment);
    this.cancelAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', cancelAddedAppointment);
    this.commitAddedAppointment = () => {
      const { onCommitChanges } = this.props;
      const { addedAppointment: stateAddedAppointment } = this.state;
      onCommitChanges({
        added: stateAddedAppointment,
      });
      this.cancelAddedAppointment();
    };

    this.commitDeletedAppointment = ({ deletedAppointmentId }) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ deleted: deletedAppointmentId });
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      editingAppointmentId = prevState.editingAppointmentId,
      appointmentChanges = prevState.appointmentChanges,
      addedAppointment = prevState.addedAppointment,
    } = nextProps;

    return {
      editingAppointmentId,
      appointmentChanges,
      addedAppointment,
    };
  }

  render() {
    const { addedAppointment, editingAppointmentId, appointmentChanges } = this.state;

    return (
      <Plugin
        name="EditingState"
      >
        <Getter name="editingAppointmentId" value={editingAppointmentId} />
        <Action name="startEditAppointment" action={this.startEditAppointment} />
        <Action name="stopEditAppointment" action={this.stopEditAppointment} />

        <Getter name="appointmentChanges" value={appointmentChanges} />
        <Action name="changeAppointment" action={this.changeAppointment} />
        <Action name="cancelChangedAppointment" action={this.cancelChangedAppointment} />
        <Action name="commitChangedAppointment" action={this.commitChangedAppointment} />

        <Getter name="addedAppointment" value={addedAppointment} />
        <Action name="addAppointment" action={this.addAppointment} />
        <Action name="changeAddedAppointment" action={this.changeAddedAppointment} />
        <Action name="cancelAddedAppointment" action={this.cancelAddedAppointment} />
        <Action name="commitAddedAppointment" action={this.commitAddedAppointment} />

        <Action name="commitDeletedAppointment" action={this.commitDeletedAppointment} />
      </Plugin>
    );
  }
}

/** A plugin that manages the scheduler appointment editing state. */
export const EditingState: React.ComponentType<EditingStateProps> = EditingStateBase;
