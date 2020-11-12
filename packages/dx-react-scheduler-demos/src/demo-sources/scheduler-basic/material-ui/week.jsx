import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

export default () => (
  <Paper>
    <Scheduler data={appointments} height={660}>
      <WeekView startDayHour={9} endDayHour={19} />
      <Appointments />
    </Scheduler>
  </Paper>
);
