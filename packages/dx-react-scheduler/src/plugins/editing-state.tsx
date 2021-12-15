import * as React from 'react';
import {
  Action, Plugin, Getter, createStateHelper, StateHelper, ComputedFn, ActionFn,
} from '@devexpress/dx-react-core';
import {
  addAppointment,
  cancelAddedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
  changedAppointmentById,
  RECURRENCE_EDIT_SCOPE,
  preCommitChanges as preCommitChangesBase,
} from '@devexpress/dx-scheduler-core';
import { EditingStateProps, EditingStateState } from '../types';

class EditingStateBase extends React.PureComponent<EditingStateProps, EditingStateState> {
  startEditAppointment: ComputedFn;
  stopEditAppointment: (payload?: any) => void;
  changeAppointment: ComputedFn;
  cancelChangedAppointment: (payload?: any) => void;
  commitChangedAppointment: ActionFn<any>;
  addAppointment: ComputedFn;
  changeAddedAppointment: ComputedFn;
  cancelAddedAppointment: (payload?: any) => void;
  commitAddedAppointment: ComputedFn;
  commitDeletedAppointment: ActionFn<any>;

  static defaultProps: Partial<EditingStateProps> = {
    defaultEditingAppointment: undefined,
    defaultAppointmentChanges: {},
    defaultAddedAppointment: {},
    preCommitChanges: preCommitChangesBase,
  };

  constructor(props) {
    super(props);

    this.state = {
      editingAppointment: props.editingAppointment || props.defaultEditingAppointment,
      addedAppointment: props.addedAppointment || props.defaultAddedAppointment,
      appointmentChanges: props.appointmentChanges || props.defaultAppointmentChanges,
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        editingAppointment: () => {
          const { onEditingAppointmentChange } = this.props;
          return onEditingAppointmentChange;
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

    this.addAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', addAppointment);
      this.changeAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', changeAppointment);
    this.cancelAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', cancelAddedAppointment);

    this.startEditAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingAppointment', startEditAppointment);
    this.stopEditAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingAppointment', stopEditAppointment);

    this.changeAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', changeAppointment);
    this.cancelChangedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', cancelChanges);

    this.commitChangedAppointment = (type = RECURRENCE_EDIT_SCOPE.CURRENT) => {
      const { appointmentChanges, editingAppointment } = this.state;
      const { onCommitChanges, preCommitChanges } = this.props;
      if (!editingAppointment) {
        return;
      }
      const changes = !editingAppointment.rRule
        ? { changed: changedAppointmentById(appointmentChanges, editingAppointment.id!) }
        : preCommitChanges!(appointmentChanges, editingAppointment, type);

      onCommitChanges(changes);
      this.cancelChangedAppointment();
      this.stopEditAppointment();
    };

    this.commitAddedAppointment = () => {
      const { onCommitChanges } = this.props;
      const { addedAppointment: stateAddedAppointment } = this.state;
      onCommitChanges({
        added: stateAddedAppointment,
      });
    };

    this.commitDeletedAppointment = ({ deletedAppointmentData, type = 'current' }) => {
      const { onCommitChanges, preCommitChanges } = this.props;

      const changes = deletedAppointmentData.rRule
        ? preCommitChanges!(null, deletedAppointmentData, type)
        : { deleted: deletedAppointmentData.id };
      onCommitChanges(changes);
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      editingAppointment = prevState.editingAppointment,
      appointmentChanges = prevState.appointmentChanges,
      addedAppointment = prevState.addedAppointment,
    } = nextProps;

    return {
      editingAppointment,
      appointmentChanges,
      addedAppointment,
    };
  }

  render() {
    const { addedAppointment, editingAppointment, appointmentChanges } = this.state;

    return (
      <Plugin
        name="EditingState"
      >
        <Getter name="editingAppointment" value={editingAppointment} />
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
