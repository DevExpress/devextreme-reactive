import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [{
        title: 'A',
        startDate: new Date(2018, 5, 25, 9, 45),
        endDate: new Date(2018, 5, 25, 10, 15),
      }, {
        title: 'B',
        startDate: new Date(2018, 5, 27, 14),
        endDate: new Date(2018, 5, 25, 15),
      }, {
        title: 'C',
        startDate: new Date(2018, 5, 29, 10, 45),
        endDate: new Date(2018, 5, 29, 11),
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
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
