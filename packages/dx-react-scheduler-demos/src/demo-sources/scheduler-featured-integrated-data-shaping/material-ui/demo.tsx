import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { orange, red, green } from '@material-ui/core/colors';
import {
  Scheduler, DayView, Appointments, MonthView, Toolbar, DateNavigator, ViewSwitcher, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core';
import classNames from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { appointments } from '../../../demo-data/month-appointments';
import { WithStyles } from '@material-ui/styles';

const styles = ({ palette }) => ({
  toolbarRoot: {
    backgroundColor: fade(palette.primary[400], 0.04),
  },
  firstRoomAppointment: {
    backgroundColor: green[400],
    '&:hover': {
      backgroundColor: green[500],
    },
  },
  secondRoomAppointment: {
    backgroundColor: orange[400],
    '&:hover': {
      backgroundColor: orange[500],
    },
  },
  thirdRoomAppointment: {
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[500],
    },
  },
  highPriorityAppointment: {
    borderLeft: '5px solid red',
  },
  middlePriorityAppointment: {
    borderLeft: '5px solid yellow',
  },
  lowPriorityAppointment: {
    borderLeft: '5px solid green',
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
  return (
    <Appointments.Appointment
      {...restProps}
      className={classNames({
        [classes.firstRoomAppointment]: data.location === 'Room 1',
        [classes.secondRoomAppointment]: data.location === 'Room 2',
        [classes.thirdRoomAppointment]: data.location === 'Room 3',
        [classes.highPriorityAppointment]: data.priority === 1,
        [classes.middlePriorityAppointment]: data.priority === 2,
        [classes.lowPriorityAppointment]: data.priority === 3,
      })}
      data={data}
    />
  );

});

const DayScaleCell = withStyles(styles)(({
  startDate, classes, ...restProps
}: DayScaleCellProps) => {
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
  { startDate, classes, ...restProps }: TimeTableCellProps,
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
          defaultCurrentDate={'2018-7-1'}
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
