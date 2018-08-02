import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  Appointments,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date('2018-06-27'),
    };
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          getTitle={appointment => appointment.text}
        >
          <ViewState
            currentDate={currentDate}
          />
          <Toolbar />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            firstDayOfWeek={1}
          />
          <Appointments />
          <AllDayPanel />
        </Scheduler>
      </Paper>
    );
  }
}
