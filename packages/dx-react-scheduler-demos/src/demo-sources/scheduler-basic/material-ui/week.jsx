import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      startDayHour: 9,
    };

    this.changeStartDayHour = this.changeStartDayHour.bind(this);
  }

  changeStartDayHour({ target }) {
    this.setState({ startDayHour: parseInt(target.value) });
  }

  render() {
    const { data, startDayHour } = this.state;

    return (
      <Paper>
        <input onChange={this.changeStartDayHour} />
        <Scheduler
          data={data}
        >
          <WeekView
            startDayHour={startDayHour}
            endDayHour={19}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
