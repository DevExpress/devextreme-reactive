import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Action, Plugin, Getter, createStateHelper,
} from '@devexpress/dx-react-core';
import {
  addAppointment,
  changeAddedAppointment,
  cancelAddedAppointment,
  deleteAppointment,
  cancelDeletedAppointment,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
  changedAppointmentById,
} from '@devexpress/dx-scheduler-core';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editingAppointmentId: props.editingAppointmentId || props.defaultEditingAppointmentId,
      addedAppointment: props.addedAppointment || props.defaultAddedAppointment,
      appointmentChanges: props.appointmentChanges || props.defaultAppointmentChanges,
      deletedAppointmentId: props.deletedAppointmentId || props.defaultDeletedAppointmentId,
    };

    const stateHelper = createStateHelper(
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
        deletedAppointmentId: () => {
          const { onDeletedAppointmentIdChange } = this.props;
          return onDeletedAppointmentIdChange;
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
    };

    this.addAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', addAppointment);
    this.changeAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', changeAddedAppointment);
    this.cancelAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', cancelAddedAppointment);
    this.commitAddedAppointment = () => {
      const { onCommitChanges } = this.props;
      const { addedAppointment: stateAddedAppointment } = this.state;
      onCommitChanges({
        added: this.validateAppointment(stateAddedAppointment),
      });
      this.cancelAddedAppointment();
    };
    this.deleteAppointment = (appointmentId) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ deleted: appointmentId });
    };

    this.deleteAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'deletedAppointmentId', deleteAppointment);
    this.cancelDeletedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'deletedAppointmentId', cancelDeletedAppointment);
    this.commitDeletedAppointment = () => {
      const { onCommitChanges } = this.props;
      const { deletedAppointmentId } = this.state;
      onCommitChanges({ deleted: deletedAppointmentId });
      this.cancelDeletedAppointment();
    };

    this.validateAppointment = ({ startDate, endDate, title }) => {
      const {
        setAppointmentEndDate,
        setAppointmentStartDate,
        setAppointmentTitle,
      } = this.props;

      const appointment = {};
      const a = setAppointmentTitle(appointment, title);
      const b = setAppointmentStartDate(a, startDate);
      const c = setAppointmentEndDate(b, endDate);
      return c;
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      editingAppointmentId = prevState.editingAppointmentId,
      appointmentChanges = prevState.appointmentChanges,
      addedAppointment = prevState.addedAppointment,
      deletedAppointmentId = prevState.deletedAppointmentId,
    } = nextProps;

    return {
      editingAppointmentId,
      appointmentChanges,
      addedAppointment,
      deletedAppointmentId,
    };
  }

  render() {
    const {
      addedAppointment, deletedAppointmentId, editingAppointmentId, appointmentChanges,
    } = this.state;

    return (
      <Plugin
        name="EditingState"
      >
        <Getter name="editingAppointmentId" value={editingAppointmentId} />
        <Action name="startEditAppointments" action={this.startEditAppointments} />
        <Action name="stopEditAppointments" action={this.stopEditAppointments} />

        <Getter name="appointmentChanges" value={appointmentChanges} />
        <Action name="changeAppointment" action={this.changeAppointment} />
        <Action name="cancelChangedAppointments" action={this.cancelChangedAppointments} />
        <Action name="commitChangedAppointments" action={this.commitChangedAppointments} />

        <Getter name="addedAppointment" value={addedAppointment} />
        <Action name="addAppointment" action={this.addAppointment} />
        <Action name="changeAddedAppointment" action={this.changeAddedAppointment} />
        <Action name="cancelAddedAppointment" action={this.cancelAddedAppointment} />
        <Action name="commitAddedAppointment" action={this.commitAddedAppointment} />

        <Getter name="deletedAppointmentId" value={deletedAppointmentId} />
        <Action name="deleteAppointment" action={this.deleteAppointment} />
        <Action name="cancelDeletedAppointment" action={this.cancelDeletedAppointment} />
        <Action name="commitDeletedAppointment" action={this.commitDeletedAppointment} />
      </Plugin>
    );
  }
}

EditingState.propTypes = {
  // createAppointmentChange: PropTypes.func,

  editingAppointmentId: PropTypes.array,
  defaultEditingAppointmentId: PropTypes.number,
  onEditingAppointmentIdChange: PropTypes.func,

  addedAppointment: PropTypes.array,
  defaultAddedAppointment: PropTypes.object,
  onAddedAppointmentChange: PropTypes.func,

  appointmentChanges: PropTypes.object,
  defaultAppointmentChanges: PropTypes.object,
  onAppointmentChangesChange: PropTypes.func,

  deletedAppointmentId: PropTypes.array,
  defaultDeletedAppointmentId: PropTypes.number,
  onDeletedAppointmentIdChange: PropTypes.func,

  onCommitChanges: PropTypes.func.isRequired,

  setAppointmentStartDate: PropTypes.func,
  setAppointmentEndDate: PropTypes.func,
  setAppointmentTitle: PropTypes.func,
};

EditingState.defaultProps = {
  // createAppointmentChange: undefined,

  editingAppointmentId: undefined,
  defaultEditingAppointmentId: undefined,
  onEditingAppointmentIdChange: undefined,

  appointmentChanges: undefined,
  defaultAppointmentChanges: {},
  onAppointmentChangesChange: undefined,

  addedAppointment: undefined,
  defaultAddedAppointment: {},
  onAddedAppointmentChange: undefined,

  deletedAppointmentId: undefined,
  defaultDeletedAppointmentId: undefined,
  onDeletedAppointmentIdChange: undefined,

  setAppointmentStartDate:
    (appointment, nextStartDate) => ({ ...appointment, startDate: nextStartDate }),
  setAppointmentEndDate: (appointment, nextEndDate) => ({ ...appointment, endDate: nextEndDate }),
  setAppointmentTitle: (appointment, nextTitle) => ({ ...appointment, title: nextTitle }),
};
