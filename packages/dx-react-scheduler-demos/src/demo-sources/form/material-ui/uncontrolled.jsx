import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-28',
    };
  }

  render() {
    const { currentDate, data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            currentDate={currentDate}
          />
          <DayView
            startDayHour={9}
            endDayHour={19}
          />
          <Appointments />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
