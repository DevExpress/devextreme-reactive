import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [{
        title: 'A',
        startDate: new Date(2018, 5, 25, 9, 45),
        endDate: new Date(2018, 5, 25, 10, 15),
      }, {
        title: 'B',
        startDate: new Date(2018, 5, 27, 14),
        endDate: new Date(2018, 5, 25, 15),
      }, {
        title: 'C',
        startDate: new Date(2018, 5, 29, 10, 45),
        endDate: new Date(2018, 5, 29, 11),
      }, {
        title: 'D',
        startDate: new Date(2018, 5, 24, 10, 45),
        endDate: new Date(2018, 5, 24, 11),
      }, {
        title: 'E',
        startDate: new Date(2018, 6, 5, 10, 45),
        endDate: new Date(2018, 6, 5, 11),
      }, {
        title: 'F',
        startDate: new Date(2018, 6, 6, 10, 45),
        endDate: new Date(2018, 6, 6, 11),
      }],
      currentDate: new Date('2018-06-20'),
    };
  }
  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <button
          onClick={() => {
            const next = new Date(new Date(this.state.currentDate).setDate(this.state.currentDate.getDate() - 7));
            this.setState({ currentDate: next });
          }}
        >
          {'<-'}
        </button>
        <button
          onClick={() => {
            const next = new Date(new Date(this.state.currentDate).setDate(this.state.currentDate.getDate() + 7));
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
