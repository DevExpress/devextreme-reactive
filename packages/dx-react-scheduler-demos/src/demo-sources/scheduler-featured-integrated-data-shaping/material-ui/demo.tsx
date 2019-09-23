import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import brown from '@material-ui/core/colors/brown';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, Appointments, MonthView, Toolbar, DateNavigator, ViewSwitcher, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { appointments } from '../../../demo-data/month-appointments-with-types';
import { WithStyles } from '@material-ui/styles';
import { amber } from '@material-ui/core/colors';

const styles = ({ palette }) => ({
  toolbarRoot: {
    backgroundColor: fade(palette.primary[400], 0.04),
  },
  personalAppointment: {
    backgroundColor: amber[200],
    '&:hover': {
      backgroundColor: amber[300],
    },
  },
  nonPersonalAppoinment: {
    backgroundColor: brown[700],
    '&:hover': {
      backgroundColor: brown[800],
    },
  },
  weekEndCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
  },
  weekEndDayScaleCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.06),
  },
});

type AppointmentProps = Appointments.AppointmentProps & WithStyles<typeof styles>;
type ToolbarRootProps = Toolbar.RootProps & WithStyles<typeof styles>;
type TimeTableCellProps = MonthView.TimeTableCellProps & WithStyles<typeof styles>;
type DayScaleCellProps = MonthView.DayScaleCellProps & WithStyles<typeof styles>;

const isWeekEnd = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;

const Appointment = withStyles(styles)(({
  classes, data, ...restProps
}: AppointmentProps) => {
  if (data.type === 'personal') {
    return (
      <Appointments.Appointment
        {...restProps}
        className={classes.personalAppointment}
        data={data}
      />
    );
  }
  return (
    <Appointments.Appointment
      className={classes.nonPersonalAppoinment}
      data={data}
      {...restProps}
    />
  );
});

const DayScaleCell = withStyles(styles)(({ startDate, classes, ...restProps }: DayScaleCellProps) => {
  return (
    <MonthView.DayScaleCell
      className={classNames({
        [classes.weekEndDayScaleCell]: isWeekEnd(startDate),
      })}
      startDate={startDate}
      {...restProps}
    />
  );
});

const TimeTableCell = withStyles(styles)((
  { startDate, classes, ...restProps }: TimeTableCellProps
) => {
  return (
    <MonthView.TimeTableCell
      className={classNames({
        [classes.weekEndCell]: isWeekEnd(startDate!),
      })}
      startDate={startDate}
      {...restProps}
    />
  );
});

const ToolbarRoot = withStyles(styles)((
  { classes, children, ...restProps }: ToolbarRootProps) => {
  return (
    <Toolbar.Root {...restProps} className={classes.toolbarRoot}>
      {children}
    </Toolbar.Root>
  );
});

const Demo: React.SFC = () => {
  return (
    <Paper>
      <Scheduler
        data={appointments}
      >
        <ViewState
          defaultCurrentDate={'2018-10-31'}
        />
        <MonthView
          name="Work Weeks"
          dayScaleCellComponent={DayScaleCell}
          timeTableCellComponent={TimeTableCell}
        />
        <MonthView />
        <DayView
          startDayHour={7}
          endDayHour={12}
        />
        <Appointments
          appointmentComponent={Appointment}
        />
        <Toolbar
          rootComponent={ToolbarRoot}
        />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
};

export default Demo;
