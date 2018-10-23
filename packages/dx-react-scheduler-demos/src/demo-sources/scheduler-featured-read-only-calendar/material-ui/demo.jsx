import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
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
} from '@devexpress/dx-react-scheduler-material-ui';

import { tasks } from '../../../demo-data/tasks';

const priorities = {
  1: 'low',
  2: 'medium',
  3: 'high',
};

const styles = {
  toolbarRoot: {
    position: 'relative',
  },
  lowPriority: {
    '&:hover': {
      background: '#43A047',
    },
    background: '#81C784',
  },
  mediumPriority: {
    '&:hover': {
      background: '#039BE5',
    },
    background: '#4FC3F7',
  },
  highPriority: {
    '&:hover': {
      background: '#F4511E',
    },
    background: '#FF8A65',
  },
};

const Appointment = withStyles(styles, { name: 'Appointment' })(
  ({ classes, data, ...restProps }) => {
    const priority = priorities[data.priorityId];
    return (
      <Appointments.Appointment
        data={data}
        className={classes[`${priority}Priority`]}
        {...restProps}
      />
    );
  },
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
        </Scheduler>
      </Paper>
    );
  }
}
