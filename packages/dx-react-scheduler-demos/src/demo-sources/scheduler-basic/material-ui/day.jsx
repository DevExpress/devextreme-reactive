import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  DayView,
  WeekView,
  ViewSwitcher,
  Toolbar,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { startDate: '2018-11-01T09:00', endDate: '2018-11-01T11:00', title: 'Meeting-2.00' },
        { startDate: '2018-11-01T11:55', endDate: '2018-11-01T12:00', title: 'Meeting-15' },
        { startDate: '2018-11-01T11:55', endDate: '2018-11-01T11:55', title: 'Meeting-0' },
        { startDate: '2018-11-01T12:10', endDate: '2018-11-01T12:20', title: 'Meeting-10' },
        { startDate: '2018-11-01T12:30', endDate: '2018-11-01T12:35', title: 'Meeting-5' },
        { startDate: '2018-11-01T13:30', endDate: '2018-11-01T13:50', title: 'Meeting-20' },
        { startDate: '2018-11-01T23:50', endDate: '2018-11-02T00:02', title: 'Meeting-5' },
        { startDate: '2018-11-01T23:50', title: 'Meeting-zero' },
      ],
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
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
        </Scheduler>
      </Paper>
    );
  }
}
