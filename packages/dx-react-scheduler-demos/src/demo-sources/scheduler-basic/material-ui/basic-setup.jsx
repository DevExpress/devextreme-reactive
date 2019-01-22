import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01 10:00', endDate: '2018-11-01 11:00', title: 'Meeting' },
  { startDate: '2018-11-01 12:30', endDate: '2018-11-01 14:30', title: 'Go to a gym' },
];

export default () => (
  <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      <DayView
        startDayHour={9}
        endDayHour={16}
      />
      <Appointments />
    </Scheduler>
  </Paper>
);
