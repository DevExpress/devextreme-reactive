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
import classNames from 'clsx';
import { lighten } from '@material-ui/core/styles/colorManipulator';

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
    acc[`${title}PriorityBackground`] = { background: color, '& button.edit-button': { background: lighten(color, 0.15) } };
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
    marginRight: theme.spacing(1),
  },
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  prioritySelector: {
    marginLeft: theme.spacing(2),
    minWidth: 140,
  },
  prioritySelectorItem: {
    display: 'flex',
    alignItems: 'center',
  },
  priorityBullet: {
    borderRadius: '50%',
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'inline-block',
  },
  defaultBullet: {
    background: theme.palette.divider,
  },
  tooltipContent: {
    paddingLeft: theme.spacing(2.2),
    paddingRight: theme.spacing(2.2),
  },
  titleNoWrap: {
    '& div > div > div': {
      whiteSpace: 'normal',
    },
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
  ({
    classes, priority, priorityChange, ...restProps
  }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
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
        {...restProps}
        data={data}
        className={priorityClasses}
      />
    );
  },
);

const EditButton = withStyles(styles, { name: 'EditButton' })(
  ({ classes, id, ...restProps }) => (
    <AppointmentTooltip.CommandButton
      {...restProps}
      {...id === 'open' ? { className: 'edit-button' } : null}
      id={id}
    />
  ),
);

const TooltipHeader = withStyles(styles, { name: 'TooltipHeader' })(
  ({ classes, appointmentData, ...restProps }) => {
    const priorityClasses = createClassesByPriorityId(
      appointmentData.priorityId, classes,
      { background: true },
    );
    return (
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}
        className={classNames(priorityClasses, classes.titleNoWrap)}
      />
    );
  },
);

const TooltipContent = withStyles(styles, { name: 'TooltipContent' })(
  ({ classes, appointmentData, ...restProps }) => {
    const priority = getPriorityById(appointmentData.priorityId);
    const priorityClasses = createClassesByPriorityId(
      appointmentData.priorityId, classes, { color: true },
    );
    let icon = <LowPriority />;
    if (appointmentData.priorityId === 2) icon = <Event />;
    else if (appointmentData.priorityId === 3) icon = <PriorityHigh />;
    return (
      <AppointmentTooltip.Content {...restProps} className={classes.tooltipContent}>
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
            commandButtonComponent={EditButton}
            showOpenButton
            showCloseButton
          />
          <AppointmentForm readOnly />
        </Scheduler>
      </Paper>
    );
  }
}
