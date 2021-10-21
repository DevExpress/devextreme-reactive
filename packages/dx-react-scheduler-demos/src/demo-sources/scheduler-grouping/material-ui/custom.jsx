import * as React from 'react';
import Paper from '@mui/material/Paper';
import { green, orange } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import LowPriority from '@mui/icons-material/LowPriority';
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import {
  ViewState, GroupingState, IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  GroupingPanel,
  DayView,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { data as appointments } from '../../../demo-data/grouping';

const priorityData = [
  { text: 'Low Priority', id: 1, color: green },
  { text: 'High Priority', id: 2, color: orange },
];

const findColorByGroupId = id => (priorityData.find(item => item.id === id)).color;
const getIconById = id => (id === 1 ? LowPriority : PriorityHigh);

const useGroupingStyles = (group) => {
  const color = findColorByGroupId(group.id);
  return makeStyles(({ spacing }) => ({
    cell: {
      backgroundColor: alpha(color[400], 0.1),
      '&:hover': {
        backgroundColor: alpha(color[400], 0.15),
      },
      '&:focus': {
        backgroundColor: alpha(color[400], 0.2),
      },
    },
    headerCell: {
      backgroundColor: alpha(color[400], 0.1),
      '&:hover': {
        backgroundColor: alpha(color[400], 0.1),
      },
      '&:focus': {
        backgroundColor: alpha(color[400], 0.1),
      },
    },
    icon: {
      paddingLeft: spacing(1),
      verticalAlign: 'middle',
    },
  }))();
};

const TimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useGroupingStyles(groupingInfo[0]);
  return (
    <DayView.TimeTableCell
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const DayScaleCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useGroupingStyles(groupingInfo[0]);
  return (
    <DayView.DayScaleCell
      className={classes.headerCell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const AllDayCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useGroupingStyles(groupingInfo[0]);
  return (
    <AllDayPanel.Cell
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const GroupingPanelCell = React.memo(({ group, ...restProps }) => {
  const classes = useGroupingStyles(group);
  const Icon = getIconById(group.id);
  return (
    <GroupingPanel.Cell
      className={classes.headerCell}
      group={group}
      {...restProps}
    >
      <Icon
        className={classes.icon}
      />
    </GroupingPanel.Cell>
  );
});

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

          <DayView
            startDayHour={9}
            endDayHour={17}
            intervalCount={3}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
          <Appointments />
          <AllDayPanel
            cellComponent={AllDayCell}
          />
          <Resources
            data={resources}
            mainResourceName="priorityId"
          />

          <IntegratedGrouping />

          <GroupingPanel
            cellComponent={GroupingPanelCell}
          />
        </Scheduler>
      </Paper>
    );
  }
}
