import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

const currentDate = '2018-06-27';

export default () => (
  <Paper>
    <Scheduler
      data={appointments}
      height={660}
    >
      <ViewState
        defaultCurrentDate={currentDate}
      />
      <WeekView
        startDayHour={9}
        endDayHour={19}
      />
      <Appointments />
      <AllDayPanel />
    </Scheduler>
  </Paper>
);
