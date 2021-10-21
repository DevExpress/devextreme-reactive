import * as React from 'react';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import withStyles from '@mui/styles/withStyles';

import { appointments } from '../../../demo-data/appointments';

const formatDayScaleDate = (date, options) => {
  const momentDate = moment(date);
  const { weekday } = options;
  return momentDate.format(weekday ? 'dddd' : 'D');
};
const formatTimeScaleDate = date => moment(date).format('hh:mm:ss');

const styles = {
  dayScaleCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const DayScaleCell = withStyles(styles, 'DayScaleCell')((
  { formatDate, classes, ...restProps },
) => (
  <WeekView.DayScaleCell
    {...restProps}
    formatDate={formatDayScaleDate}
    className={classes.dayScaleCell}
  />
));
const TimeScaleLabel = (
  { formatDate, ...restProps },
) => <WeekView.TimeScaleLabel {...restProps} formatDate={formatTimeScaleDate} />;

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
          height={660}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            dayScaleCellComponent={DayScaleCell}
            timeScaleLabelComponent={TimeScaleLabel}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
