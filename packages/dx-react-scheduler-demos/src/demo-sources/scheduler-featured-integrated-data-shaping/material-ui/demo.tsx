import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import orange from '@material-ui/core/colors/orange';
import brown from '@material-ui/core/colors/brown';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, Appointments, MonthView, Toolbar, DateNavigator, ViewSwitcher, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core';
import { appointments } from '../../../demo-data/month-appointments-with-types';

const styles = ({ palette }) => ({
  toolbarRoot: {
    backgroundColor: palette.primary[50],
  },
  personalAppointment: {
    backgroundColor: orange[200],
  },
  nonPersonalAppoinment: {
    backgroundColor: brown[700],
  },
});

const AppointmentBase: React.ComponentType<Appointments.AppointmentProps> = ({
  classes, data, ...restProps
}) => {
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
      {...restProps}
      className={classes.nonPersonalAppoinment}
      data={data}
    />
  );
};

const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
// const TimeTableLayout: React.ComponentType<MonthView.TimeTableLayoutProps> = (props) => {
//   const correctedCellsData = props.cellsData.map(dataItem =>  dataItem.slice(1, -1));
//   return <MonthView.TimeTableLayout {...props} cellsData={correctedCellsData} />;
// };
// const DayScaleCell: React.ComponentType<MonthView.DayScaleCellProps> = (props) => {
//   if (props.startDate!.getDay() === 0 || props.startDate!.getDay() === 6) return null;
//   return <MonthView.DayScaleCell {...props} />;
// };
// const TimeTableCell: React.ComponentType<MonthView.TimeTableCellProps> = (props) => {
//   if (props.startDate!.getDay() === 0 || props.startDate!.getDay() === 6) return null;
//   return <MonthView.TimeTableCell {...props} />;
// };
const ToolbarRootBase: React.ComponentType<Toolbar.RootProps> = ({
  classes, children, ...restProps
}) => {
  return (
    <Toolbar.Root {...restProps} className={classes.toolbarRoot}>
      {children}
    </Toolbar.Root>
  );
};

const ToolbarRoot = withStyles(styles, { name: 'ToolbarRoot' })(ToolbarRootBase);

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
