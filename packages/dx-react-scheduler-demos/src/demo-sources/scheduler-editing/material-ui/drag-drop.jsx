/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from '../../../demo-data/appointments';

const dragDisableIds = new Set([3, 8, 10, 12]);

const appointmentComponent = (props) => {
  if (dragDisableIds.has(props.data.id)) {
    return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
  } return <Appointments.Appointment {...props} />;
};
const allowDrag = ({ id }) => !dragDisableIds.has(id);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date('2018-06-27'),
    };

    this.onCommitChanges = this.commitChanges.bind(this);
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
      if (deleted) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.onCommitChanges}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <Appointments
            appointmentComponent={appointmentComponent}
          />

          <DragDropProvider
            allowDrag={allowDrag}
          />
        </Scheduler>
      </Paper>
    );
  }
}
