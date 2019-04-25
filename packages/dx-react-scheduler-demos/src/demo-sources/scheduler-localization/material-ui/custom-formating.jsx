import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from '../../../demo-data/appointments';

const formatDayScaleDate = (date, options) => {
  const momentDate = moment(date);
  if (options.weekday) return momentDate.format('dddd');
  return momentDate.format('D');
};
const formatTimeScaleDate = date => moment(date).format('hh:mm:ss');

const DayScaleCell = (
  { formatDate, ...restProps },
) => <WeekView.DayScaleCell {...restProps} formatDate={formatDayScaleDate} />;
const TimeScaleCell = (
  { formatDate, ...restProps },
) => <WeekView.TimeScaleCell {...restProps} formatDate={formatTimeScaleDate} />;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
    };
  }

  render() {
    const { data, currentDate, locale } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          locale={locale}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            dayScaleCellComponent={DayScaleCell}
            timeScaleCellComponent={TimeScaleCell}
          />
          <Toolbar />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
