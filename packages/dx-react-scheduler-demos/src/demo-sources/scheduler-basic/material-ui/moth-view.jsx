import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import {
  Scheduler,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/month-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date('2018-07-17'),
    };
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          currentDate={currentDate}
        >
          <MonthView />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
