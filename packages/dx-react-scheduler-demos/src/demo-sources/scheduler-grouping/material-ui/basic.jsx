import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState, GroupingState, IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  blue, teal, indigo, deepPurple, green, purple,
} from '@material-ui/core/colors';

const appointments = [{
  id: 0,
  title: 'Watercolor Landscape',
  members: [1, 2, 3],
  startDate: new Date(2017, 4, 28, 9, 30),
  endDate: new Date(2017, 4, 28, 12, 30),
}, {
  id: 1,
  title: 'Oil Painting for Beginners',
  members: [4, 5, 6],
  startDate: new Date(2017, 4, 28, 9, 30),
  endDate: new Date(2017, 4, 28, 12, 30),
}, {
  id: 2,
  title: 'Testing',
  members: [1, 2, 3],
  startDate: new Date(2017, 4, 29, 9, 30),
  endDate: new Date(2017, 4, 29, 12, 30),
}, {
  id: 3,
  title: 'Final Exams',
  members: [4, 5, 6],
  startDate: new Date(2017, 4, 29, 9, 30),
  endDate: new Date(2017, 4, 29, 12, 30),
}];

export const owners = [{
  text: 'Andrew Glover',
  id: 1,
  color: blue,
}, {
  text: 'Arnie Schwartz',
  id: 2,
  color: teal,
}, {
  text: 'John Heart',
  id: 3,
  color: indigo,
}, {
  text: 'Taylor Riley',
  id: 4,
  color: deepPurple,
}, {
  text: 'Brad Farkus',
  id: 5,
  color: green,
}, {
  text: 'Arthur Miller',
  id: 6,
  color: purple,
}];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [{
        fieldName: 'members',
        title: 'Members',
        instances: owners,
        allowMultiple: true,
      }],
      grouping: [{
        resourceName: 'members',
      }],
    };
  }

  render() {
    const { data, resources, grouping } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2017-05-28"
          />
          <GroupingState
            grouping={grouping}
          />

          <DayView
            startDayHour={9}
            endDayHour={13}
            excludedDays={[0, 6]}
            intervalCount={2}
          />
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="members"
          />

          <IntegratedGrouping />
          <AppointmentTooltip />

          <GroupingPanel />
        </Scheduler>
      </Paper>
    );
  }
}
