import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { green, orange } from '@material-ui/core/colors';
import { makeStyles, fade } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  cell: {
    backgroundColor: color => fade(color[400], 0.1),
    '&:hover': {
      backgroundColor: color => fade(color[400], 0.15),
    },
    '&:focus': {
      backgroundColor: color => fade(color[400], 0.2),
    },
  },
  headerCell: {
    backgroundColor: color => fade(color[400], 0.1),
    '&:hover': {
      backgroundColor: color => fade(color[400], 0.1),
    },
    '&:focus': {
      backgroundColor: color => fade(color[400], 0.1),
    },
  },
});

const findColorByGroupId = id => (priorityData.find(item => item.id === id)).color;

const TimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useStyles(findColorByGroupId(groupingInfo[0].id));
  return (
    <DayView.TimeTableCell
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const DayScaleCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useStyles(findColorByGroupId(groupingInfo[0].id));
  return (
    <DayView.DayScaleCell
      className={classes.headerCell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const AllDayCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useStyles(findColorByGroupId(groupingInfo[0].id));
  return (
    <AllDayPanel.Cell
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const GroupingPanelCell = React.memo(({ groupingItem, ...restProps }) => {
  const classes = useStyles(findColorByGroupId(groupingItem.id));
  return (
    <GroupingPanel.Cell
      className={classes.headerCell}
      groupingItem={groupingItem}
      {...restProps}
    />
  );
});

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
    };
  }

  render() {
    const { data, resources } = this.state;

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
            grouping={[{
              resourceName: 'priorityId',
            }]}
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