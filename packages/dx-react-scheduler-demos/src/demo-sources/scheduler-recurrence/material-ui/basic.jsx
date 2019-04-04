import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments = [{
  title: 'Website Re-Design Plan',
  startDate: new Date(2018, 5, 25, 9, 35),
  endDate: new Date(2018, 5, 25, 11, 30),
  id: 0,
  rRule: 'FREQ=DAILY;COUNT=5',
  exDate: new Date(2018, 5, 28, 9, 35),
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2018, 5, 25, 12, 11),
  endDate: new Date(2018, 5, 25, 13, 0),
  id: 1,
  rRule: 'FREQ=DAILY;COUNT=5',
  exDate: new Date(2018, 5, 27, 12, 11),
}, {
  title: 'Install New Router in Dev Room',
  startDate: new Date(2018, 5, 25, 14, 30),
  endDate: new Date(2018, 5, 25, 15, 35),
  id: 2,
  rRule: 'FREQ=DAILY;COUNT=5',
  exDate: new Date(2018, 5, 26, 14, 30),
}];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
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
            defaultCurrentDate="2018-06-25"
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
