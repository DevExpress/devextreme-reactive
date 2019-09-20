import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, Appointments, MonthView, Toolbar, DateNavigator, ViewSwitcher, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments: Array<AppointmentModel> = [{
  startDate: '2018-11-12T10:00',
  endDate: '2018-11-12T11:15',
  title: 'Meeting',
  type: 'private',
}, {
  startDate: '2018-10-22T07:30',
  endDate: '2018-10-22T09:00',
  title: 'Go to a gym',
  type: 'work',
}];

const Appointment: React.ComponentType<Appointments.AppointmentProps> = (props) => {
  if (props.data.type === 'private') {
    return <Appointments.Appointment {...props} style={{ backgroundColor: '#EC407A' }} />;
  }
  return <Appointments.Appointment {...props} style={{ backgroundColor: '#7E57C2' }} />;
};

// const TimeTableLayout: React.ComponentType<MonthView.TimeTableLayoutProps> = (props) => {
//   const correctedCellsData = props.cellsData.map(dataItem =>  dataItem.slice(1, -1));
//   return <MonthView.TimeTableLayout {...props} cellsData={correctedCellsData} />;
// };
const DayScaleCell: React.ComponentType<MonthView.DayScaleCellProps> = (props) => {
  //if (props.startDate!.getDay() === 0 || props.startDate!.getDay() === 6) return null;
  return <MonthView.DayScaleCell {...props} />;
};
const TimeTableCell: React.ComponentType<MonthView.TimeTableCellProps> = (props) => {
  //if (props.startDate!.getDay() === 0 || props.startDate!.getDay() === 6) return null;
  return <MonthView.TimeTableCell {...props} />;
};

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
          //timeTableLayoutComponent={TimeTableLayout}
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
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
};

export default Demo;
