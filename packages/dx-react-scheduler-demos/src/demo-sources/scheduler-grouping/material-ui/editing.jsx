import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { blue, teal } from '@material-ui/core/colors';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  GroupingPanel,
  AllDayPanel,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from '../../../demo-data/tasks';

const appointments = [
  {
    id: 0,
    title: 'Watercolor Landscape',
    members: [1, 2, 3],
    startDate: new Date(2017, 4, 28, 9, 30),
    endDate: new Date(2017, 4, 28, 13, 30),
  }, {
    id: 1,
    title: 'Oil Painting for Beginners',
    members: [4, 5, 6],
    startDate: new Date(2017, 4, 28, 9, 30),
    endDate: new Date(2017, 4, 28, 13, 30),
  },
  {
    id: 2,
    title: 'Testing',
    members: [1, 2, 3],
    startDate: new Date(2017, 4, 29, 9, 30),
    endDate: new Date(2017, 4, 29, 13, 30),
  }, {
    id: 3,
    title: 'Final Exams',
    members: [4, 5, 6],
    startDate: new Date(2017, 4, 29, 9, 30),
    endDate: new Date(2017, 4, 29, 13, 30),
  },
];

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
            endDayHour={14}
            excludedDays={[0, 6]}
            intervalCount={2}
          />
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="members"
          />

          <IntegratedGrouping />
          <EditRecurrenceMenu />
          <AppointmentTooltip />
          <AppointmentForm />

          <GroupingPanel />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
