import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState, GroupingState, IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  GroupingPanel,
  WeekView,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { data as appointments, priorityData } from '../../../demo-data/grouping';

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
          <GroupingState
            grouping={grouping}
          />

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

          <GroupingPanel />
        </Scheduler>
      </Paper>
    );
  }
}
