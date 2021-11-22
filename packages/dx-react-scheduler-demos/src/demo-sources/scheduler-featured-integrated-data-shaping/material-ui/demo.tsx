import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, Appointments, MonthView, Toolbar,
  DateNavigator, ViewSwitcher, TodayButton, Resources, AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { indigo, blue, teal } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import classNames from 'clsx';

const PREFIX = 'Demo';

const classes = {
  appointment: `${PREFIX}-appointment`,
  highPriorityAppointment: `${PREFIX}-highPriorityAppointment`,
  mediumPriorityAppointment: `${PREFIX}-mediumPriorityAppointment`,
  lowPriorityAppointment: `${PREFIX}-lowPriorityAppointment`,
  weekEndCell: `${PREFIX}-weekEndCell`,
  weekEndDayScaleCell: `${PREFIX}-weekEndDayScaleCell`,
  text: `${PREFIX}-text`,
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`
};

const StyledMonthViewDayScaleCell = styled(MonthView.DayScaleCell)(({ theme: { palette } }) => ({
  [`&.${classes.weekEndDayScaleCell}`]: {
    backgroundColor: alpha(palette.action.disabledBackground, 0.06),
  },
}));

const StyledMonthViewTimeTableCell = styled(MonthView.TimeTableCell)(({ theme: { palette } }) => ({
  [`&.${classes.weekEndCell}`]: {
    backgroundColor: alpha(palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
    },
  },
}));

const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: 0,
    borderBottom: 0,
  },
  [`&.${classes.highPriorityAppointment}`]: {
    borderLeft: `4px solid ${teal[500]}`,
  },
  [`&.${classes.mediumPriorityAppointment}`]: {
    borderLeft: `4px solid ${blue[500]}`,
  },
  [`&.${classes.lowPriorityAppointment}`]: {
    borderLeft: `4px solid ${indigo[500]}`,
  },
}));

const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(({ theme: { palette } }) => ({
  [`& .${classes.text}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  [`& .${classes.content}`]: {
    opacity: 0.7,
  },
  [`& .${classes.container}`]: {
    width: '100%',
    lineHeight: 1.2,
    height: '100%',
  }
}));

const appointments = [
  {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2018, 5, 25, 13, 0),
    endDate: new Date(2018, 5, 25, 13, 30),
    priority: 2,
    location: 'Room 3',
  }, {
    title: 'Brochure Design Review',
    startDate: new Date(2018, 5, 28, 14, 10),
    endDate: new Date(2018, 5, 28, 15, 30),
    priority: 1,
    location: 'Room 1',
  },
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 29, 9, 30),
    endDate: new Date(2018, 5, 29, 11, 30),
    priority: 1,
    location: 'Room 3',
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 6, 2, 12, 0),
    endDate: new Date(2018, 6, 2, 13, 0),
    priority: 3,
    location: 'Room 2',
  }, {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2018, 6, 2, 14, 30),
    endDate: new Date(2018, 6, 2, 15, 30),
    priority: 2,
    location: 'Room 3',
  }, {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2018, 6, 4, 10, 0),
    endDate: new Date(2018, 6, 4, 11, 0),
    priority: 1,
    location: 'Room 1',
  }, {
    title: 'Final Budget Review',
    startDate: new Date(2018, 6, 6, 12, 0),
    endDate: new Date(2018, 6, 6, 13, 35),
    priority: 3,
    location: 'Room 1',
  }, {
    title: 'New Brochures',
    startDate: new Date(2018, 6, 6, 14, 30),
    endDate: new Date(2018, 6, 6, 15, 45),
    priority: 3,
    location: 'Room 3',
  }, {
    title: 'Install New Database',
    startDate: new Date(2018, 6, 10, 9, 45),
    endDate: new Date(2018, 6, 10, 11, 15),
    priority: 2,
    location: 'Room 2',
  }, {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2018, 6, 12, 12, 0),
    endDate: new Date(2018, 6, 12, 14, 0),
    priority: 1,
    location: 'Room 2',
  }, {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2018, 6, 16, 15, 15),
    endDate: new Date(2018, 6, 16, 16, 30),
    priority: 2,
    location: 'Room 3',
  }, {
    title: 'Customer Workshop',
    startDate: new Date(2018, 6, 18, 11, 0),
    endDate: new Date(2018, 6, 18, 12, 0),
    priority: 3,
    location: 'Room 1',
  }, {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2018, 6, 20, 11, 0),
    endDate: new Date(2018, 6, 20, 13, 30),
    priority: 1,
    location: 'Room 3',
  },
  {
    title: 'New Brochures',
    startDate: new Date(2018, 6, 23, 14, 30),
    endDate: new Date(2018, 6, 23, 15, 45),
    priority: 2,
    location: 'Room 3',
  }, {
    title: 'Install New Database',
    startDate: new Date(2018, 6, 23, 9, 45),
    endDate: new Date(2018, 6, 23, 11, 15),
    priority: 3,
    location: 'Room 2',
  }, {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2018, 6, 26, 12, 0),
    endDate: new Date(2018, 6, 26, 14, 0),
    priority: 1,
    location: 'Room 1',
  }, {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2018, 6, 31, 15, 15),
    endDate: new Date(2018, 6, 31, 16, 30),
    priority: 2,
    location: 'Room 3',
  }, {
    title: 'Install New Database',
    startDate: new Date(2018, 6, 31, 9, 45),
    endDate: new Date(2018, 6, 31, 11, 15),
    priority: 3,
    location: 'Room 2',
  },
];

const resources = [{
  fieldName: 'location',
  title: 'Location',
  instances: [
    { id: 'Room 1', text: 'Room 1', color: indigo },
    { id: 'Room 2', text: 'Room 2', color: blue },
    { id: 'Room 3', text: 'Room 3', color: teal },
  ],
}, {
  fieldName: 'priority',
  title: 'Priority',
  instances: [
    { id: 1, text: 'High Priority', color: teal },
    { id: 2, text: 'Medium Priority', color: blue },
    { id: 3, text: 'Low Priority', color: indigo },
  ],
}];

const isWeekEnd = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;
const defaultCurrentDate = new Date(2018, 6, 2, 11, 15);

const DayScaleCell = (({
  startDate, ...restProps
}: MonthView.DayScaleCellProps) => (
  <StyledMonthViewDayScaleCell
    className={classNames({
      [classes.weekEndDayScaleCell]: isWeekEnd(startDate),
    })}
    startDate={startDate}
    {...restProps}
  />
));

const TimeTableCell = ((
  { startDate,  ...restProps }: MonthView.TimeTableCellProps,
) => (
  <StyledMonthViewTimeTableCell
    className={classNames({
      [classes.weekEndCell]: isWeekEnd(startDate!),
    })}
    startDate={startDate}
    {...restProps}
  />
));

const Appointment = (({ data, ...restProps }: Appointments.AppointmentProps) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classNames({
      [classes.highPriorityAppointment]: data.priority === 1,
      [classes.mediumPriorityAppointment]: data.priority === 2,
      [classes.lowPriorityAppointment]: data.priority === 3,
      [classes.appointment]: true,
    })}
    data={data}
  />
));

// #FOLD_BLOCK
const AppointmentContent = (({
  data, ...restProps
  // #FOLD_BLOCK
}: Appointments.AppointmentContentProps) =>  {
  let priority = 'low';
  if (data.priority === 2) priority = 'medium';
  if (data.priority === 3) priority = 'high';
  return (
    <StyledAppointmentsAppointmentContent {...restProps} data={data}>
      <div className={classes.container}>
        <div className={classes.text}>
          {data.title}
        </div>
        <div className={classNames(classes.text, classes.content)}>
          {`Priority: ${priority}`}
        </div>
        <div className={classNames(classes.text, classes.content)}>
          {`Location: ${data.location}`}
        </div>
      </div>
    </StyledAppointmentsAppointmentContent>
  );
});

export default () => (
  <Paper>
    <Scheduler
      data={appointments}
    >
      <ViewState
        defaultCurrentDate={defaultCurrentDate}
      />

      <MonthView
        dayScaleCellComponent={DayScaleCell}
        timeTableCellComponent={TimeTableCell}
      />
      <DayView
        displayName={'Three days'}
        startDayHour={9}
        endDayHour={17}
        intervalCount={3}
      />

      <Appointments
        appointmentComponent={Appointment}
        appointmentContentComponent={AppointmentContent}
      />
      <Resources
        data={resources}
      />

      <AppointmentTooltip
        showCloseButton
      />
      <Toolbar />
      <DateNavigator />
      <ViewSwitcher />
      <TodayButton />
    </Scheduler>
  </Paper>
);
