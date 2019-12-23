import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState, GroupingState, IntegratedGrouping, IntegratedEditing, EditingState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  blue, teal, indigo, deepPurple, green, purple,
} from '@material-ui/core/colors';

const appointments = [{
  id: 0,
  title: 'Watercolor Landscape',
  members: [1, 2],
  startDate: new Date(2017, 4, 28, 10, 0),
  endDate: new Date(2017, 4, 28, 12, 0),
}, {
  id: 1,
  title: 'Oil Painting for Beginners',
  members: [3, 4],
  startDate: new Date(2017, 4, 28, 9, 30),
  endDate: new Date(2017, 4, 28, 11, 30),
}, {
  id: 2,
  title: 'Testing',
  members: [5, 6],
  startDate: new Date(2017, 4, 28, 10, 30),
  endDate: new Date(2017, 4, 28, 12, 30),
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

    this.commitChanges = this.commitChanges.bind(this);
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
    const { data, resources, grouping } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2017-05-28"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={grouping}
          />

          <DayView
            startDayHour={9}
            endDayHour={13}
          />
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="members"
          />

          <IntegratedGrouping />
          <IntegratedEditing />
          <AppointmentTooltip />

          <GroupingPanel />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
