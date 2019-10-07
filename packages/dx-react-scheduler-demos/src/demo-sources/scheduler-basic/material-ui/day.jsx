import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  ViewSwitcher,
  Toolbar,
  Appointments,
  AppointmentTooltip,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, startDate: '2018-11-01T09:00', endDate: '2018-11-01T11:00', title: 'Meeting-2.00' },
        { id: 1, startDate: '2018-11-01T11:55', endDate: '2018-11-01T12:00', title: 'Meeting-5', rRule: 'FREQ=DAILY;COUNT=2' },
        { id: 2, startDate: '2018-11-01T11:55', endDate: '2018-11-01T11:55', title: 'Meeting-0' },
        { id: 3, startDate: '2018-11-01T12:10', endDate: '2018-11-01T12:20', title: 'Meeting-10' },
        { id: 4, startDate: '2018-11-01T12:30', endDate: '2018-11-01T12:35', title: 'Meeting-5' },
        { id: 5, startDate: '2018-11-01T13:30', endDate: '2018-11-01T13:50', title: 'Meeting-20' },
        { id: 6, startDate: '2018-11-01T23:50', endDate: '2018-11-02T00:02', title: 'Meeting-5' },
        { id: 7, startDate: '2018-11-01T23:50', title: 'Meeting-zero' },
      ],
    };

    this.commitChanges = this.commitChanges.bind(this);
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
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />

          <ViewState
            defaultCurrentDate="2018-11-01"
          />
          <WeekView />
          <DayView
            startDayHour={0}
            endDayHour={12}
          />
          <Appointments />

          <Toolbar />
          <ViewSwitcher />

          <AppointmentTooltip />

          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
