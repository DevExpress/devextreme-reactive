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
import { withStyles } from '@material-ui/core/styles';
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
import { lighten } from '@material-ui/core/styles/colorManipulator';

import { tasks, priorities } from '../../../demo-data/tasks';

const filterTasks = (items, priorityId) => items.filter(task => (
  !priorityId || task.priorityId === priorityId
));
const getPriorityById = priorityId => priorities.find(({ id }) => id === priorityId).title;
const getShortPriorityById = priorityId => priorities
  .find(({ id }) => id === priorityId).shortTitle;

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
  contentItemValue: {
    padding: 0,
  },
  contentItemIcon: {
    textAlign: 'center',
    verticalAlign: 'middle',
  },
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
  defaultBullet: {
    background: theme.palette.divider,
  },
  titleNoWrap: {
    '& div > div > div': {
      whiteSpace: 'normal',
    },
  },
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
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
    whiteSpace: 'nowrap',
  },
  icon: {
    verticalAlign: 'middle',
  },
  grayIcon: {
    color: theme.palette.action.active,
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
});

const PrioritySelectorItem = ({ id, classes }) => {
  let bulletClass = classes.defaultBullet;
  let text = 'All Tasks';
  let shortText = 'All';
  if (id) {
    bulletClass = createClassesByPriorityId(id, classes, { background: true });
    text = getPriorityById(id);
    shortText = getShortPriorityById(id);
  }
  return (
    <div className={classes.prioritySelectorItem}>
      <span className={`${classes.priorityBullet} ${bulletClass}`} />
      <span className={classes.priorityText}>{text}</span>
      <span className={classes.priorityShortText}>{shortText}</span>
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

const TooltipContent = withStyles(styles, { name: 'TooltipContent' })(
  // #FOLD_BLOCK
  ({ classes, appointmentData, formatDate }) => {
    const priority = getPriorityById(appointmentData.priorityId);
    const priorityClasses = createClassesByPriorityId(
      appointmentData.priorityId, classes, { color: true },
    );
    let icon = <LowPriority className={classes.icon} />;
    if (appointmentData.priorityId === 2) icon = <Event className={classes.icon} />;
    else if (appointmentData.priorityId === 3) icon = <PriorityHigh className={classes.icon} />;
    return (
      <div className={classes.content}>
        <Grid container alignItems="center" className={classes.titleContainer}>
          <Grid item xs={2} className={classNames(classes.textCenter, priorityClasses)}>
            <Lens className={classes.lens} />
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
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={2} className={classes.textCenter}>
            <AccessTime className={classNames(classes.icon, classes.grayIcon)} />
          </Grid>
          <Grid item xs={10}>
            <div className={classes.text}>
              {`${formatDate(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' })}
              - ${formatDate(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' })}`}
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid className={classNames(classes.contentItemIcon, priorityClasses)} item xs={2}>
            {icon}
          </Grid>
          <Grid className={classes.contentItemValue} item xs={10}>
            <span className={priorityClasses}>{` ${priority} priority`}</span>
          </Grid>
        </Grid>
      </div>
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
