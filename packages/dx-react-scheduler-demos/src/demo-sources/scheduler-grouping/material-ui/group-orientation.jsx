import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Toolbar,
  ViewSwitcher,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { blue, orange } from '@mui/material/colors';

import { data as appointments } from '../../../demo-data/grouping';

const resources = [{
  fieldName: 'priorityId',
  title: 'Priority',
  instances: [
    { text: 'Low Priority', id: 1, color: blue },
    { text: 'High Priority', id: 2, color: orange },
  ],
}];
const groupOrientation = viewName => viewName.split(' ')[0];
const grouping = [{
  resourceName: 'priorityId',
}];

export default () => {
  const [data, setData] = React.useState(appointments);
  const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
    }
  }, [setData, data]);

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
          onCommitChanges={onCommitChanges}
        />
        <GroupingState
          grouping={grouping}
          groupOrientation={groupOrientation}
        />

        <WeekView
          startDayHour={9}
          endDayHour={17}
          excludedDays={[0, 6]}
          cellDuration={60}
          name="Vertical Orientation"
        />
        <WeekView
          startDayHour={9}
          endDayHour={17}
          excludedDays={[0, 6]}
          name="Horizontal Orientation"
        />

        <Appointments />
        <Resources
          data={resources}
          mainResourceName="priorityId"
        />

        <IntegratedGrouping />
        <IntegratedEditing />
        <AppointmentTooltip />
        <AppointmentForm />

        <GroupingPanel />
        <Toolbar />
        <ViewSwitcher />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
};
