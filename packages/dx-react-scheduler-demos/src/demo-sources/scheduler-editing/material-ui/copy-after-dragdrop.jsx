/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentTooltip,
  WeekView,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from '../../../demo-data/appointments';

const SHIFT_KEY = 16;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
      deletedAppointmentId: null,
      confirmationVisibility: false,
      isShiftPressed: false,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.toggleConfirmationVisibility = this.toggleConfirmationVisibility.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown');
    window.removeEventListener('keyup');
  }

  onKeyDown(event) {
    if (event.keyCode === SHIFT_KEY) {
      this.setState({ isShiftPressed: true });
    }
  }

  onKeyUp(event) {
    if (event.keyCode === SHIFT_KEY) {
      this.setState({ isShiftPressed: false });
    }
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
      const { isShiftPressed } = this.state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        if (isShiftPressed) {
          const changedAppointment = data.find(appointment => changed[appointment.id]);
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [
            ...data,
            { ...changedAppointment, id: startingAddedId, ...changed[changedAppointment.id] },
          ];
        } else {
          data = data.map(appointment => (
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment));
        }
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisibility();
      }
      return { data };
    });
  }

  render() {
    const { currentDate, data } = this.state;

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

          <WeekView
            startDayHour={9}
            endDayHour={17}
          />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
