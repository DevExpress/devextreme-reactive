import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
  DragDropProvider,
  Toolbar,
  ViewSwitcher,
  MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date('2018-06-27'),
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    let { data } = this.state;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [
        ...data,
        {
          id: startingAddedId,
          ...added,
        },
      ];
    }
    if (changed) {
      data = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    }
    if (deleted) {
      data = data.filter(appointment => appointment.id !== deleted);
    }
    this.setState({ data });
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper style={{ margin: '50px' }}>
        <Scheduler
          data={data}
        >



          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <Appointments />
          <AllDayPanel />

          <Toolbar />
          <ViewSwitcher />

          <DragDropProvider />

        </Scheduler>
      </Paper>
    );
  }
}
