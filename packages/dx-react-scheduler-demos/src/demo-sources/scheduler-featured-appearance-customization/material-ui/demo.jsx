import * as React from 'react';
// #FOLD_BLOCK
import {
  ViewState,
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
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
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

import { tasks, priorities } from '../../../demo-data/tasks';

const filterTasks = (items, priorityId) => items.filter(task => (
  !priorityId || task.priorityId === priorityId
));
const getPriorityById = priorityId => priorities.find(({ id }) => id === priorityId).title;

const createClassesByPriorityId = (
  priorityId, classes,
  { background = false, color = false, hover = false },
// #FOLD_BLOCK
) => {
  const priority = getPriorityById(priorityId);
  const result = [];
  if (background) result.push(classes[`${priority}PriorityBackground`]);
  if (color) result.push(classes[`${priority}PriorityColor`]);
  if (hover) result.push(classes[`${priority}PriorityHover`]);
  return result.join(' ');
};
// #FOLD_BLOCK
const styles = theme => ({
  ...priorities.reduce((acc, { title, color, activeColor }) => {
    acc[`${title}PriorityBackground`] = { background: color };
    acc[`${title}PriorityColor`] = { color };
    acc[`${title}PriorityHover`] = { '&:hover': { background: activeColor } };
    return acc;
  }, {}),
  contentItem: {
    paddingLeft: 0,
  },
  contentItemValue: {
    padding: 0,
  },
  contentItemIcon: {
    marginRight: theme.spacing.unit,
  },
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  prioritySelector: {
    marginLeft: theme.spacing.unit * 2,
    minWidth: 140,
  },
  prioritySelectorItem: {
    display: 'flex',
    alignItems: 'center',
  },
  priorityBullet: {
    borderRadius: '50%',
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    display: 'inline-block',
  },
  defaultBullet: {
    background: theme.palette.divider,
  },
});

const PrioritySelectorItem = ({ id, classes }) => {
  let bulletClass = classes.defaultBullet;
  let text = 'All Tasks';
  if (id) {
    bulletClass = createClassesByPriorityId(id, classes, { background: true });
    text = getPriorityById(id);
  }
  return (
    <div className={classes.prioritySelectorItem}>
      <span className={`${classes.priorityBullet} ${bulletClass}`} />
      {text}
    </div>
  );
};

const PrioritySelector = withStyles(styles, { name: 'PrioritySelector' })(
  ({ classes, priorityChange, priority }) => (
    <FormControl className={classes.prioritySelector}>
      <Select
        disableUnderline
        value={priority}
        onChange={(e) => {
          priorityChange(e.target.value);
        }}
        renderValue={value => <PrioritySelectorItem id={value} classes={classes} />}
      >
        <MenuItem value={0}>
          <PrioritySelectorItem id={0} classes={classes} />
        </MenuItem>
        {priorities.map(({ id }) => (
          <MenuItem value={id} key={id.toString()}>
            <PrioritySelectorItem id={id} classes={classes} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
);

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(
  ({ classes, priority, priorityChange }) => (
    <Toolbar.FlexibleSpace className={classes.flexibleSpace}>
      <PrioritySelector priority={priority} priorityChange={priorityChange} />
    </Toolbar.FlexibleSpace>
  ),
);

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
  ({ classes, appointmentData }) => {
    const priority = getPriorityById(appointmentData.priorityId);
    const priorityClasses = createClassesByPriorityId(
      appointmentData.priorityId, classes, { color: true },
    );
    let icon = <LowPriority />;
    if (appointmentData.priorityId === 2) icon = <Event />;
    else if (appointmentData.priorityId === 3) icon = <PriorityHigh />;
    return (
      <AppointmentTooltip.Content>
        <List>
          <ListItem className={classes.contentItem}>
            <ListItemIcon className={`${classes.contentItemIcon} ${priorityClasses}`}>
              {icon}
            </ListItemIcon>
            <ListItemText className={classes.contentItemValue}>
              <span className={priorityClasses}>{` ${priority} priority`}</span>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.contentItem}>
            <ListItemIcon className={`${classes.contentItemIcon}`}>
              <AccessTime />
            </ListItemIcon>
            <ListItemText className={classes.contentItemValue}>
              {moment(appointmentData.startDate).format('h:mm A')}
              {' - '}
              {moment(appointmentData.endDate).format('h:mm A')}
            </ListItemText>
          </ListItem>
        </List>
      </AppointmentTooltip.Content>
    );
  },
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: '2018-04-23',
      currentViewName: 'Work Week',
      data: tasks,
      currentPriority: 0,
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.priorityChange = (value) => {
      this.setState({ currentPriority: value });
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
      data, currentDate, currentViewName, currentPriority,
    } = this.state;

    return (
      <Paper>
        <Scheduler data={filterTasks(data, currentPriority)}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            excludedDays={[0, 6]}
            name="Work Week"
          />
          <DayView
            startDayHour={9}
            endDayHour={19}
          />
          <Appointments appointmentComponent={Appointment} />
          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
          <AllDayPanel />
          <AppointmentTooltip
            headerComponent={TooltipHeader}
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
