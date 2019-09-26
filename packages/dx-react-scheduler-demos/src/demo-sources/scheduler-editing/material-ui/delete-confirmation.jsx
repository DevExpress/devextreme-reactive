/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { appointments } from '../../../demo-data/appointments';

const DeleteConfirmationDialog = ({
  visible, onCancel, onCommit,
}) => (
  <Dialog
    open={visible}
  >
    <DialogTitle>
      Delete Appointment
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this appointment?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onCommit} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
      deletedAppointmentId: null,
      confirmationVisibility: false,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.toggleConfirmationVisibility = this.toggleConfirmationVisibility.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
  }

  setDeletedAppointmentId(deletedAppointmentId) {
    this.setState({ deletedAppointmentId });
  }

  toggleConfirmationVisibility() {
    const { confirmationVisibility } = this.state;
    this.setState({ confirmationVisibility: !confirmationVisibility });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);
      this.toggleConfirmationVisibility();
      return { data: nextData, deletedAppointmentId: null };
    });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisibility();
      }
      return { data };
    });
  }

  render() {
    const { currentDate, data, confirmationVisibility } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />

          <DayView
            startDayHour={9}
            endDayHour={17}
          />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>

        <DeleteConfirmationDialog
          visible={confirmationVisibility}
          onCancel={this.toggleConfirmationVisibility}
          onCommit={this.commitDeletedAppointment}
        />
      </Paper>
    );
  }
}
