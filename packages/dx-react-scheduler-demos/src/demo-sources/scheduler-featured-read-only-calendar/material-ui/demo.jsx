import * as React from 'react';

import {
  ViewState,
} from '@devexpress/dx-react-scheduler';
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
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import LowPriority from '@material-ui/icons/LowPriority';
import Event from '@material-ui/icons/Event';
import AccessTime from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { tasks } from '../../../demo-data/tasks';

const priorities = {
  low: { id: 1, color: '#81c784', activeColor: '#43a047' },
  medium: { id: 2, color: '#4fc3f7', activeColor: '#039be5' },
  high: { id: 3, color: '#ff8a65', activeColor: '#f4511e' },
};

const getPriorityById = priorityId => (
  Object.entries(priorities).find(([, { id }]) => id === priorityId)[0]
);

const createClassesByPriorityId = (
  priorityId,
  classes,
  { background = false, color = false, hover = false },
) => {
  const priority = getPriorityById(priorityId);
  const result = [];
  if (background) result.push(classes[`${priority}PriorityBackground`]);
  if (color) result.push(classes[`${priority}PriorityColor`]);
  if (hover) result.push(classes[`${priority}PriorityHover`]);
  return result.join(' ');
};

const styles = theme => ({
  ...Object.entries(priorities)
    .reduce((acc, [priority, { color, activeColor }]) => {
      acc[`${priority}PriorityBackground`] = { background: color };
      acc[`${priority}PriorityColor`] = { color };
      acc[`${priority}PriorityHover`] = { '&:hover': { background: activeColor } };
      return acc;
    }, {}),
  conentItem: {
    paddingLeft: 0,
  },
  conentItemValue: {
    textTransform: 'capitalize',
    padding: 0,
  },
  conentItemIcon: {
    marginRight: theme.spacing.unit,
  },
});

const PrioritySelector = () => (
  <FormControl style={{ width: 150 }}>
    <Select
      value=""
      inputProps={{
        name: 'priority',
        id: 'priority',
      }}
      displayEmpty
      disableUnderline
    >
      <MenuItem value="" disabled>Priority</MenuItem>
      <MenuItem value={null}>All</MenuItem>
      <MenuItem value={1}>Low</MenuItem>
      <MenuItem value={2}>Medium</MenuItem>
      <MenuItem value={3}>High</MenuItem>
    </Select>
  </FormControl>
);

const FlexibleSpace = () => (
  <Toolbar.FlexibleSpace style={{ margin: '0 auto 0 0' }}>
    <PrioritySelector />
  </Toolbar.FlexibleSpace>
);

const Priority = ({ id, classes }) => {
  const priority = getPriorityById(id);
  const priorityClasses = createClassesByPriorityId(id, classes, { color: true });
  let icon = <LowPriority />;
  if (id === 2) icon = <Event />;
  else if (id === 3) icon = <PriorityHigh />;

  return (
    <React.Fragment>
      <ListItemIcon className={`${classes.conentItemIcon} ${priorityClasses}`}>
        {icon}
      </ListItemIcon>
      <ListItemText className={classes.conentItemValue}>
        <span className={priorityClasses}>{` ${priority} priority`}</span>
      </ListItemText>
    </React.Fragment>
  );
};

const Appointment = withStyles(styles, { name: 'Appointment' })(
  ({ classes, data, ...restProps }) => {
    const priorityClasses = createClassesByPriorityId(
      data.priorityId, classes,
      { background: true, hover: true },
    );
    return (
      <Appointments.Appointment
        data={data}
        className={priorityClasses}
        {...restProps}
      />
    );
  },
);

const TooltipHeader = withStyles(styles, { name: 'TooltipHeader' })(
  ({ classes, appointmentData, ...restProps }) => {
    const priorityClasses = createClassesByPriorityId(
      appointmentData.priorityId, classes,
      { background: true },
    );
    return (
      <AppointmentTooltip.Header
        appointmentData={appointmentData}
        className={priorityClasses}
        {...restProps}
      />
    );
  },
);

const TooltipContent = withStyles(styles, { name: 'TooltipContent' })(
  ({ classes, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content {...restProps}>
      <List>
        <ListItem className={classes.conentItem}>
          <Priority id={appointmentData.priorityId} classes={classes} />
        </ListItem>
        <ListItem className={classes.conentItem}>
          <ListItemIcon className={`${classes.conentItemIcon}`}>
            <AccessTime />
          </ListItemIcon>
          <ListItemText className={classes.conentItemValue}>
            {moment(appointmentData.startDate).format('h:mm A')}
            {' - '}
            {moment(appointmentData.endDate).format('h:mm A')}
          </ListItemText>
        </ListItem>
      </List>
    </AppointmentTooltip.Content>
  ),
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: '2018-04-23',
      currentViewName: 'Week',
      data: tasks,
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
  }

  render() {
    const {
      data,
      currentDate, currentViewName,
    } = this.state;

    return (
      <Paper>
        <Scheduler data={data}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView startDayHour={8} endDayHour={18} excludedDays={[0, 6]} />
          <DayView startDayHour={8} endDayHour={18} />
          <Appointments appointmentComponent={Appointment} />
          <Toolbar
            flexibleSpaceComponent={FlexibleSpace}
          />
          <DateNavigator />
          <ViewSwitcher />
          <AllDayPanel />
          <AppointmentTooltip
            headerComponent={TooltipHeader}
            contentComponent={TooltipContent}
          />
        </Scheduler>
      </Paper>
    );
  }
}
