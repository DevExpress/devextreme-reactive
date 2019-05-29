import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      startDayHour: 9,
      cellDuration: 30,
      excludedDays: [],
      intervalCount: 1,
      firstDayOfWeek: 1,
      endDayHour: 18,
    };

    this.changeStartDayHour = field => ({ target }) => {
      this.setState({ [field]: parseInt(target.value) });
    };
  }

  render() {
    const {
      data,
      startDayHour,
      cellDuration,
      excludedDays,
      intervalCount,
      firstDayOfWeek,
      endDayHour,
    } = this.state;

    // cellDuration,
    // excludedDays,
    // name: viewName,
    // intervalCount,
    // firstDayOfWeek,
    // startDayHour,
    // endDayHour,

    return (
      <Paper>
        cellDuration: <input onChange={this.changeStartDayHour('cellDuration')} />
        startDayHour: <input onChange={this.changeStartDayHour('startDayHour')} />
        excludedDays: <input onChange={this.changeStartDayHour('excludedDays')} />
        intervalCount: <input onChange={this.changeStartDayHour('intervalCount')} />
        firstDayOfWeek: <input onChange={this.changeStartDayHour('firstDayOfWeek')} />
        endDayHour: <input onChange={this.changeStartDayHour('endDayHour')} />
        <Scheduler
          data={data}
        >
          {/* <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={cellDuration}
            excludedDays={excludedDays}
            intervalCount={intervalCount}
            firstDayOfWeek={firstDayOfWeek}
          /> */}
          <DayView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={cellDuration}
            intervalCount={intervalCount}
            firstDayOfWeek={firstDayOfWeek}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
