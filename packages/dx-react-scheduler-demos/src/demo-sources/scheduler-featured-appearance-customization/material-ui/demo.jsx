import * as React from 'react';
// #FOLD_BLOCK
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
// #FOLD_BLOCK
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AllDayPanel,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import LowPriority from '@material-ui/icons/LowPriority';
import Lens from '@material-ui/icons/Lens';
import Event from '@material-ui/icons/Event';
import AccessTime from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'clsx';

import { groupingTasks as tasks, priorities } from '../../../demo-data/tasks';

const grouping = [{
  resourceName: 'priorityId',
}];

const filterTasks = (items, priorityId) => items.filter(task => (
  !priorityId || task.priorityId === priorityId
));
const findColorByGroupId = id => (priorities.find(item => item.id === id)).color;
const getIconById = (id) => {
  if (id === 1) {
    return LowPriority;
  }
  if (id === 2) {
    return Event;
  }
  return PriorityHigh;
};

// #FOLD_BLOCK
const styles = theme => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  prioritySelector: {
    marginLeft: theme.spacing(2),
    minWidth: 140,
    '@media (max-width: 500px)': {
      minWidth: 0,
      fontSize: '0.75rem',
      marginLeft: theme.spacing(0.5),
    },
  },
});

// #FOLD_BLOCK
const usePrioritySelectorItemStyles = makeStyles(({ palette, spacing }) => ({
  bullet: ({ color }) => ({
    backgroundColor: color ? color[400] : palette.divider,
    borderRadius: '50%',
    width: spacing(2),
    height: spacing(2),
    marginRight: spacing(2),
    display: 'inline-block',
  }),
  prioritySelectorItem: {
    display: 'flex',
    alignItems: 'center',
  },
  priorityText: {
    '@media (max-width: 500px)': {
      display: 'none',
    },
  },
  priorityShortText: {
    '@media (min-width: 500px)': {
      display: 'none',
    },
  },
}));

// #FOLD_BLOCK
const useTooltipContentStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  contentContainer: {
    paddingBottom: theme.spacing(1.5),
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  icon: {
    verticalAlign: 'middle',
  },
  contentItemIcon: {
    textAlign: 'center',
  },
  grayIcon: {
    color: theme.palette.action.active,
  },
  colorfulContent: {
    color: ({ color }) => color[300],
  },
  lens: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
}));

// #FOLD_BLOCK
const useGroupingStyles = (group) => {
  const color = findColorByGroupId(group.id);
  return makeStyles(({ spacing }) => ({
    cell: {
      backgroundColor: fade(color[400], 0.1),
      '&:hover': {
        backgroundColor: fade(color[400], 0.15),
      },
      '&:focus': {
        backgroundColor: fade(color[400], 0.2),
      },
    },
    headerCell: {
      backgroundColor: fade(color[400], 0.1),
      '&:hover': {
        backgroundColor: fade(color[400], 0.1),
      },
      '&:focus': {
        backgroundColor: fade(color[400], 0.1),
      },
    },
    icon: {
      paddingLeft: spacing(1),
      verticalAlign: 'middle',
    },
  }))();
};

const DayViewTimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useGroupingStyles(groupingInfo[0]);
  return (
    <DayView.TimeTableCell
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const DayViewDayScaleCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useGroupingStyles(groupingInfo[0]);
  return (
    <DayView.DayScaleCell
      className={classes.headerCell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const WeekViewTimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
  const classes = useGroupingStyles(groupingInfo[0]);
  return (
    <DayView.TimeTableCell
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const WeekViewDayScaleCell = React.memo(({ groupingInfo, ...restProps }) => {
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

// #FOLD_BLOCK
const PrioritySelectorItem = ({ color, text: resourceTitle }) => {
  const text = resourceTitle || 'All Tasks';
  const shortText = resourceTitle ? text.substring(0, 1) : 'All';
  const classes = usePrioritySelectorItemStyles({ color });

  return (
    <div className={classes.prioritySelectorItem}>
      <span className={classes.bullet} />
      <span className={classes.priorityText}>{text}</span>
      <span className={classes.priorityShortText}>{shortText}</span>
    </div>
  );
};

const PrioritySelector = withStyles(styles, { name: 'PrioritySelector' })(({
  classes, priorityChange, priority,
}) => {
  const currentPriority = priority > 0 ? priorities[priority - 1] : {};
  return (
    <FormControl className={classes.prioritySelector}>
      <Select
        disableUnderline
        value={priority}
        onChange={(e) => {
          priorityChange(e.target.value);
        }}
        renderValue={() => (
          <PrioritySelectorItem text={currentPriority.text} color={currentPriority.color} />
        )}
      >
        <MenuItem value={0}>
          <PrioritySelectorItem />
        </MenuItem>
        {priorities.map(({ id, color, text }) => (
          <MenuItem value={id} key={id.toString()}>
            <PrioritySelectorItem color={color} text={text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(({
  classes, priority, priorityChange, ...restProps
}) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <PrioritySelector priority={priority} priorityChange={priorityChange} />
  </Toolbar.FlexibleSpace>
));

const TooltipContent = ({ appointmentData, formatDate, appointmentResources }) => {
  const resource = appointmentResources[0];
  const classes = useTooltipContentStyles({ color: resource.color });
  let icon = <LowPriority className={classes.icon} />;
  if (appointmentData.priorityId === 2) {
    icon = <Event className={classes.icon} />;
  }
  if (appointmentData.priorityId === 3) {
    icon = <PriorityHigh className={classes.icon} />;
  }
  return (
    <div className={classes.content}>
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2} className={classNames(classes.textCenter)}>
          <Lens className={classNames(classes.lens, classes.colorfulContent)} />
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {appointmentData.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              {formatDate(appointmentData.startDate, { day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' })}
              - ${formatDate(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' })}`}
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" key={`${resource.fieldName}_${resource.id}`}>
        <Grid
          className={classNames(classes.contentItemIcon, classes.icon, classes.colorfulContent)}
          item
          xs={2}
        >
          {icon}
        </Grid>
        <Grid item xs={10}>
          <span className={classNames(classes.text, classes.colorfulContent)}>
            {`${resource.text} priority`}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: '2018-04-23',
      currentViewName: 'Work Week',
      data: tasks,
      currentPriority: 0,
      resources: [{
        fieldName: 'priorityId',
        title: 'Priority',
        instances: priorities,
      }],
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.priorityChange = (value) => {
      const { resources } = this.state;
      const nextResources = [{
        ...resources[0],
        instances: value > 0 ? [priorities[value - 1]] : priorities,
      }];

      this.setState({ currentPriority: value, resources: nextResources });
    };
    this.flexibleSpace = connectProps(FlexibleSpace, () => {
      const { currentPriority } = this.state;
      return {
        priority: currentPriority,
        priorityChange: this.priorityChange,
      };
    });
  }

  componentDidUpdate() {
    this.flexibleSpace.update(); // #IMPORTANT_LINE
  }

  render() {
    const {
      data, currentDate, currentViewName, currentPriority, resources,
    } = this.state;

    return (
      <Paper>
        <Scheduler
          data={filterTasks(data, currentPriority)}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <GroupingState
            grouping={grouping}
          />

          <WeekView
            startDayHour={9}
            endDayHour={19}
            excludedDays={[0, 6]}
            name="Work Week"
            timeTableCellComponent={WeekViewTimeTableCell}
            dayScaleCellComponent={WeekViewDayScaleCell}
          />
          <DayView
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={DayViewTimeTableCell}
            dayScaleCellComponent={DayViewDayScaleCell}
          />
          <AllDayPanel
            cellComponent={AllDayCell}
          />

          <Appointments />
          <Resources
            data={resources}
          />
          <IntegratedGrouping />

          <GroupingPanel
            cellComponent={GroupingPanelCell}
          />
          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
          <AppointmentTooltip
            contentComponent={TooltipContent}
            showOpenButton
            showCloseButton
          />
          <AppointmentForm readOnly />
        </Scheduler>
      </Paper>
    );
  }
}
