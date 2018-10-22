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
} from '@devexpress/dx-react-scheduler-material-ui';

import { tasks } from '../../../demo-data/tasks';

const styles = {
  toolbarRoot: {
    position: 'relative',
  },
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root>
        {children}
      </Toolbar.Root>
    </div>
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
          <Appointments />
          <Toolbar
            rootComponent={ToolbarWithLoading}
          />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    );
  }
}
