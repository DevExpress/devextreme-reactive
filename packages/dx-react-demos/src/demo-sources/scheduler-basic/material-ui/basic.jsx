import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date('2018-06-20'),
    };
  }
  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <button
          onClick={() => {
            const next = new Date(new Date(this.state.currentDate)
              .setDate(this.state.currentDate.getDate() - 7));
            this.setState({ currentDate: next });
          }}
        >
          {'<-'}
        </button>
        <button
          onClick={() => {
            const next = new Date(new Date(this.state.currentDate)
              .setDate(this.state.currentDate.getDate() + 7));
            this.setState({ currentDate: next });
          }}
        >
          {'->'}
        </button>
        <Scheduler
          data={data}
          currentDate={currentDate}
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
