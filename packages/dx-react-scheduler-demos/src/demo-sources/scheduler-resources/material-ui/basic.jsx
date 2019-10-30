import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from '../../../demo-data/tasks';

const appointments = [{
  title: 'Website Re-Design Plan',
  startDate: new Date(2018, 5, 25, 12, 35),
  endDate: new Date(2018, 5, 25, 15, 0),
  id: 0,
  owner: 1,
  location: ['Room 1', 'Room 2', 'Room 4', 'Room 3', 'Room 5'],
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2018, 5, 26, 12, 35),
  endDate: new Date(2018, 5, 26, 15, 0),
  id: 1,
  owner: 2,
  location: ['Room 2'],
}, {
  title: 'Install New Router in Dev Room',
  startDate: new Date(2018, 5, 27, 12, 35),
  endDate: new Date(2018, 5, 27, 15, 0),
  id: 2,
  owner: 3,
  location: ['Room 3'],
}, {
  title: 'Approve Personal Computer Upgrade Plan',
  startDate: new Date(2018, 5, 28, 12, 35),
  endDate: new Date(2018, 5, 28, 15, 0),
  id: 3,
  owner: 4,
  location: ['Room 4'],
}, {
  title: 'Final Budget Review',
  startDate: new Date(2018, 5, 29, 12, 35),
  endDate: new Date(2018, 5, 29, 15, 0),
  id: 4,
  owner: 5,
  location: ['Room 5'],
}];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [
        {
          fieldName: 'location',
          title: 'Location',
          allowMultiple: true,
          items: [
            { id: 'Room 1', text: 'Room 1' },
            { id: 'Room 2', text: 'Room 2' },
            { id: 'Room 3', text: 'Room 3' },
            { id: 'Room 4', text: 'Room 4' },
            { id: 'Room 5', text: 'Room 5' },
          ],
        },
        {
          fieldName: 'owner',
          title: 'Speaker',
          items: [
            {
              text: 'Andrew Glover',
              id: 1,
              // color: '#7E57C2',
            }, {
              text: 'Arnie Schwartz',
              id: 2,
              // color: '#FF7043',
            }, {
              text: 'John Heart',
              id: 3,
              // color: '#E91E63',
            }, {
              text: 'Taylor Riley',
              id: 4,
              // color: '#E91E63',
            }, {
              text: 'Brad Farkus',
              id: 5,
              // color: '#AB47BC',
            },
          ],
        },
      ],
    };
  }

  render() {
    const { data, resources } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2018-06-27"
          />
          <Resources
            data={resources}
            mainResourceName="owner"
          />
          <WeekView
            startDayHour={11.5}
            endDayHour={16}
          />
          <Appointments />
          <AppointmentTooltip />
          <AppointmentForm readonly />
        </Scheduler>
      </Paper>
    );
  }
}
