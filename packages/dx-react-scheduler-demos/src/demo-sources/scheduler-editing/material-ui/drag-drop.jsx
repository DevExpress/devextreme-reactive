/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

const recurrenceAppointments = [{
  title: 'Website Re-Design Plan',
  startDate: new Date(2018, 5, 25, 9, 15),
  endDate: new Date(2018, 5, 25, 11, 30),
  id: 100,
  rRule: 'FREQ=DAILY;COUNT=3',
  exDate: '20180628T063500Z,20180626T061500Z',
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2018, 5, 25, 12, 11),
  endDate: new Date(2018, 5, 25, 13, 0),
  id: 101,
  rRule: 'FREQ=DAILY;COUNT=4',
  exDate: '20180627T091100Z',
  allDay: true,
}, {
  title: 'Install New Router in Dev Room',
  startDate: new Date(2018, 5, 25, 13, 30),
  endDate: new Date(2018, 5, 25, 14, 35),
  id: 102,
  rRule: 'FREQ=DAILY;COUNT=5',
}, {
  title: 'Approve Personal Computer Upgrade Plan',
  startDate: new Date(2018, 5, 26, 10, 0),
  endDate: new Date(2018, 5, 26, 11, 0),
  id: 3,
  location: 'Room 2',
}, {
  title: 'Final Budget Review',
  startDate: new Date(2018, 5, 27, 11, 45),
  endDate: new Date(2018, 5, 27, 13, 20),
  id: 4,
  location: 'Room 2',
}, {
  title: 'New Brochures',
  startDate: new Date(2018, 5, 26, 14, 40),
  endDate: new Date(2018, 5, 26, 15, 45),
  id: 5,
  location: 'Room 2',
}, {
  title: 'Install New Database',
  startDate: new Date(2018, 5, 28, 9, 45),
  endDate: new Date(2018, 5, 28, 11, 15),
  id: 6,
  location: 'Room 1',
}, {
  title: 'Approve New Online Marketing Strategy',
  startDate: new Date(2018, 5, 29, 11, 45),
  endDate: new Date(2018, 5, 29, 13, 5),
  id: 7,
  location: 'Room 3',
}, {
  title: 'Create Icons for Website',
  startDate: new Date(2018, 5, 29, 10, 0),
  endDate: new Date(2018, 5, 29, 11, 30),
  id: 12,
  location: 'Room 2',
}];

const dragDisableIds = new Set([3, 8, 10, 12]);

const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    return <Appointments.Appointment {...props} />;
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: recurrenceAppointments,
      currentDate: new Date('2018-06-27'),
    };

    this.onCommitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.onCommitChanges}
          />
          <EditRecurrenceMenu />
          <WeekView
            startDayHour={9}
            endDayHour={16}
          />
          <Appointments
            appointmentComponent={appointmentComponent}
          />
          <AllDayPanel />
          <DragDropProvider
            allowDrag={allowDrag}
          />
        </Scheduler>
      </Paper>
    );
  }
}
