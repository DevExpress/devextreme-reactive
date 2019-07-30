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
  CURRENT
} from '@devexpress/dx-scheduler-core';
import { preCommitChanges as preCommitChangesBase } from '@devexpress/dx-scheduler-core';
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
      .bind(stateHelper, 'editingAppointment', startEditAppointment);
    this.stopEditAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingAppointment', stopEditAppointment);

    this.changeAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', changeAppointment);
    this.cancelChangedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentChanges', cancelChanges);

    this.commitChangedAppointment = (type = CURRENT) => {
      const { appointmentChanges, editingAppointment } = this.state;
      const { onCommitChanges, preCommitChanges  } = this.props;

      if (!editingAppointment.rRule) {
        onCommitChanges({ changed: { [editingAppointment.id]: appointmentChanges } });
        this.cancelChangedAppointment();
        this.stopEditAppointment();
      } else {
        const changed = preCommitChanges(appointmentChanges, editingAppointment, type);

        onCommitChanges(changed);
        this.cancelChangedAppointment();
        this.stopEditAppointment();
      }
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

    this.commitDeletedAppointment = (deletedAppointment, type = 'current') => {
      const { onCommitChanges, preCommitChanges } = this.props;

      const changes = preCommitChanges(null, deletedAppointment, type);

      onCommitChanges(changes); // { changed: { ... add exDate } }
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
