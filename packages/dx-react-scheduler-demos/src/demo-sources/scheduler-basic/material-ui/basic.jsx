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

const Navigation = ({ currentDate, goNext }) => (
  <div>
    <button
      type="button"
      onClick={() => {
        const next = new Date(new Date(currentDate)
          .setDate(currentDate.getDate() - 7));
        goNext(next);
      }}
    >
      {'<-'}
    </button>
    <button
      type="button"
      onClick={() => {
        const next = new Date(new Date(currentDate)
          .setDate(currentDate.getDate() + 7));
        goNext(next);
      }}
    >
      {'->'}
    </button>
  </div>
);

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
      <div>
        <Navigation
          currentDate={currentDate}
          goNext={(next) => { this.setState({ currentDate: next }); }}
        />
        <Paper>
          <Scheduler
            data={data}
            currentDate={currentDate}
            getTitle={appointment => appointment.text}
          >
            <Toolbar />
            <WeekView
              startDayHour={9}
              endDayHour={19}
              firstDayOfWeek={1}
            />
            <DateNavigator />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
