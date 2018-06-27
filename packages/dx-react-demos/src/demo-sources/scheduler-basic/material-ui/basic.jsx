import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointment,
} from '@devexpress/dx-react-scheduler-material-ui';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [{
        title: 'Website Re-Design Plan',
        startDate: new Date(2017, 4, 22, 9, 30),
        endDate: new Date(2017, 4, 22, 11, 30),
      }],
    };
  }
  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          currentDate={new Date(2018, 5, 25)}
        >
          <Toolbar />
          <WeekView
            startDayHour={8}
            endDayHour={18}
            firstDayOfWeek={1}
          />
          <DateNavigator />
          <Appointment />
        </Scheduler>
      </Paper>
    );
  }
}
