import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import { Scheduler, WeekView, Toolbar } from '@devexpress/dx-react-scheduler-material-ui';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
          />
        </Scheduler>
      </Paper>
    );
  }
}
