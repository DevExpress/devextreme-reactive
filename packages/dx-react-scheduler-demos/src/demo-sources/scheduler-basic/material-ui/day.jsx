import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

export default () => (
  <Paper>
    <Scheduler
      data={appointments}
    >
      <DayView
        startDayHour={8}
        endDayHour={13}
      />
      <Appointments />
      <AppointmentTooltip />
    </Scheduler>
  </Paper>
);
