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
  MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { data as appointments } from '../../../demo-data/grouping';

const priorityData = [
  { text: 'Low Priority', id: 1, color: blue },
  { text: 'High Priority', id: 2, color: teal },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
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

          {/* <MonthView /> */}
          <WeekView
            startDayHour={9}
            endDayHour={17}
            excludedDays={[0, 6]}
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
      </Paper>
    );
  }
}
