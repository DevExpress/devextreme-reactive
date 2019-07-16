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
    defaultAppointmentChanges: {},
    defaultAddedAppointment: {},
    // TODO: add three methods of editing 'all' | 'current' | 'following'
    preCommitChanges: (changes, appointmentData, type) => ({ [appointmentData.id]: changes }),
  };

  constructor(props) {
    super(props);

    this.state = {
      editingAppointmentData: props.editingAppointmentData || props.defaultEditingAppointmentData,
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
      .bind(stateHelper, 'editingAppointmentData', startEditAppointment);
    this.stopEditAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingAppointmentData', stopEditAppointment);

    this.changeAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', changeAppointment);
    this.cancelChangedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', cancelChanges);

    // will be renamed to commitChangedAppointment
    this.commitChangedAppointment = () => ({ appointmentId }) => {
      const { appointmentChanges, editingAppointmentData } = this.state;
      const { onCommitChanges, preCommitChanges } = this.props;
      const changed = preCommitChanges(appointmentChanges, editingAppointmentData, 'current');

      onCommitChanges({ changed });
      this.cancelChangedAppointment();
      this.stopEditAppointment();
    };

    this.preCommitChanges = (type) => {
      const { appointmentChanges, editingAppointmentData } = this.state;
      const { onCommitChanges, preCommitChanges  } = this.props;

      const changed = preCommitChanges(appointmentChanges, editingAppointmentData, type);

      onCommitChanges({ changed });
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
    const { addedAppointment, editingAppointmentData, appointmentChanges } = this.state;

    return (
      <Plugin
        name="EditingState"
      >

        <Action name="preCommitChanges" action={this.preCommitChanges} />

        <Getter name="editingAppointmentData" value={editingAppointmentData} />
        <Action name="startEditAppointment" action={this.startEditAppointment} />
        <Action name="stopEditAppointment" action={this.stopEditAppointment} />

        <Getter name="appointmentChanges" value={appointmentChanges} />
        <Action name="changeAppointment" action={this.changeAppointment} />
        <Action name="cancelChangedAppointment" action={this.cancelChangedAppointment} />
        <Getter name="commitChangedAppointment" computed={this.commitChangedAppointment} />

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
