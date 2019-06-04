import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  DayView,
  MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      intervalCount: 1,
    };

    this.onValueChange = (e) => {
      this.setState({ intervalCount: e.target.value });
    };
  }

  render() {
    const { data, intervalCount } = this.state;

    return (
      <Paper>
        <input onChange={this.onValueChange} />
        <Scheduler
          data={data}
          height={660}
        >
          <MonthView
            startDayHour={9}
            endDayHour={19}
            intervalCount={intervalCount}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
