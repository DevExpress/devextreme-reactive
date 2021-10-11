import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2019-06-23';
const appointments = [
  { title: 'Mail New Leads for Follow Up', startDate: '2019-06-23T10:00' },
  { title: 'Product Meeting', startDate: '2019-06-23T10:30', endDate: '2019-06-23T11:30' },
  { title: 'Send Territory Sales Breakdown', startDate: '2019-06-23T12:35' },
];

export default () => (
  <Paper>
    <Scheduler
      data={appointments}
    >
      <ViewState
        currentDate={currentDate}
      />
      <DayView
        startDayHour={9.5}
        endDayHour={13.5}
      />
      <Appointments />
    </Scheduler>
  </Paper>
);
