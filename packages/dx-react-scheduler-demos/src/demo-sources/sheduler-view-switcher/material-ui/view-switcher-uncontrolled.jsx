import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import { ViewState } from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  MonthView,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/month-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentView: 'MonthView',
    };
    this.changeCurrentView = this.changeCurrentView.bind(this);
  }
  changeCurrentView() {
    let nextView = 'MonthView';
    if (nextView === this.state.currentView) {
      nextView = 'WeekView';
    }
    this.setState({ currentView: nextView });
  }
  render() {
    const { data, currentView } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            // currentView={currentView}
            defaultCurrentDate="2018-07-25"
          />
          <Toolbar />

          <WeekView
            startDayHour={9}
            endDayHour={19}
            firstDayOfWeek={1}
          />
          <MonthView />
          <ViewSwitcher />
          <DateNavigator />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
