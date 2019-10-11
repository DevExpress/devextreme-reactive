import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

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
          <DayView
            startDayHour={8}
            endDayHour={13}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
