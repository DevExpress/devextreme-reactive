import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { blue, teal } from '@material-ui/core/colors';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  GroupingPanel,
  WeekView,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { data as appointments } from '../../../demo-data/grouping';

const priorityData = [
  { text: 'Low Priority', id: 1, color: blue },
  { text: 'High Priority', id: 2, color: teal },
  // { text: 'High Priority 2', id: 3 },
  // { text: 'High Priority 4', id: 4 },
  // { text: 'High Priority 5', id: 5 },
  // { text: 'High Priority 6', id: 6 },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments.filter(appointment => appointment.priorityId < 3),
      resources: [{
        fieldName: 'priorityId',
        title: 'Priority',
        instances: priorityData,
      }],
      grouping: [{
        resourceName: 'priorityId',
      }],
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.callback = this.callback.bind(this);
  }

  callback(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  ) {
    console.clear();
    console.log(`Render Time - ${actualDuration}`);
    console.log(`Time without cache - ${baseDuration}`);
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
        <React.Profiler id="Scheduler" onRender={this.callback}>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentDate="2018-05-30"
            />
            <EditingState
              onCommitChanges={this.commitChanges}
            />
            <GroupingState
              grouping={grouping}
            />

            <WeekView
              startDayHour={8}
              endDayHour={16}
              cellDuration={60}
              excludedDays={[0, 1, 2, 3, 4, 6]}
            />
            <Appointments />
            <AllDayPanel />
            <Resources
              data={resources}
              mainResourceName="priorityId"
            />

            <IntegratedGrouping />
            <IntegratedEditing />
            <AppointmentTooltip />
            <AppointmentForm />

            <GroupingPanel />
            <DragDropProvider />
          </Scheduler>
        </React.Profiler>
      </Paper>
    );
  }
}
