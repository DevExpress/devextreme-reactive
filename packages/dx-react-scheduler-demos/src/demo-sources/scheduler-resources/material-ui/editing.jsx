import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  GroupingPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from '../../../demo-data/tasks';
import { appointments, resourcesData } from '../../../demo-data/resources';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [
        {
          fieldName: 'roomId',
          title: 'Room',
          instances: resourcesData,
        },
        {
          fieldName: 'members',
          title: 'Members',
          instances: owners,
          allowMultiple: true,
        },
      ],
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
    const { data, resources } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2017-05-25"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={[{
              resourceName: 'members',
            }]}
          />

          <MonthView />
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="members"
          />

          <IntegratedGrouping />
          <EditRecurrenceMenu />
          <AppointmentTooltip
            showOpenButton
          />
          <AppointmentForm />

          <GroupingPanel />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
