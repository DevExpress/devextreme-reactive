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

import { tasks } from '../../../demo-data/tasks';

const priorities = {
  1: 'low',
  2: 'medium',
  3: 'high',
};

const styles = (theme) => {
  const priorityClasses = Object.entries({ low: '#81C784', medium: '#4FC3F7', high: '#FF8A65' })
    .reduce((acc, [priority, color]) => {
      acc[`${priority}PriorityBackground`] = { background: color };
      acc[`${priority}PriorityColor`] = { color };
      return acc;
    }, {});

  return {
    ...priorityClasses,
    lowPriorityHover: {
      '&:hover': {
        background: '#43A047',
      },
    },
    mediumPriorityHover: {
      '&:hover': {
        background: '#039BE5',
      },
    },
    highPriorityHover: {
      '&:hover': {
        background: '#F4511E',
      },
    },
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
  };
};

const Priority = ({ id, classes }) => {
  const priority = priorities[id];
  let icon = <LowPriority />;
  if (id === 2) icon = <Event />;
  else if (id === 3) icon = <PriorityHigh />;
  return (
    <React.Fragment>
      <ListItemIcon className={`${classes.conentItemIcon} ${classes[`${priority}PriorityColor`]}`}>
        {icon}
      </ListItemIcon>
      <ListItemText className={classes.conentItemValue}>
        <span className={classes[`${priority}PriorityColor`]}>{` ${priorities[id]} priority`}</span>
      </ListItemText>
    </React.Fragment>
  );
};

const Appointment = withStyles(styles, { name: 'Appointment' })(
  ({ classes, data, ...restProps }) => {
    const priority = priorities[data.priorityId];
    const className = classes[`${priority}PriorityBackground`];
    const hoverClassName = classes[`${priority}PriorityHover`];
    return (
      <Appointments.Appointment
        data={data}
        className={`${className} ${hoverClassName}`}
        {...restProps}
      />
    );
  },
);

const TooltipHeader = withStyles(styles, { name: 'TooltipHeader' })(
  ({ classes, appointmentData, ...restProps }) => {
    const priority = priorities[appointmentData.priorityId];
    const className = classes[`${priority}PriorityBackground`];
    return (
      <AppointmentTooltip.Header
        appointmentData={appointmentData}
        className={className}
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
          <Toolbar />
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
