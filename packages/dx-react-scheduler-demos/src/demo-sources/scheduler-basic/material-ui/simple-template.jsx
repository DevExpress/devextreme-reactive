import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from '../../../demo-data/appointments';

const currentDate = '2018-06-27';

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#FFC107',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default () => (
  <Paper>
    <Scheduler
      data={appointments}
      height={660}
    >
      <ViewState
        currentDate={currentDate}
      />
      <WeekView
        startDayHour={9}
        endDayHour={19}
      />
      <Appointments
        appointmentComponent={Appointment}
      />
    </Scheduler>
  </Paper>
);
