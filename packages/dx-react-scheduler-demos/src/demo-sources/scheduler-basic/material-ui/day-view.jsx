import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

// import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // data: appointments,
      currentDate: new Date(),
    };
  }

  render() {
    const { currentDate } = this.state;

    return (
      <Paper>
        <Scheduler
          // data={data}
        >
          <ViewState
            currentDate={currentDate}
          />
          <DayView
            startDayHour={9}
            endDayHour={19}
          />
        </Scheduler>
      </Paper>
    );
  }
}
