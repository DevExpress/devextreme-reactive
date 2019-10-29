import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Resources } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { teal } from '@material-ui/core/colors';

import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [
        { fieldName: 'location', title: 'Location', items: [{ id: 'Room 1', text: 'Room 1' }, { id: 'Room 2', text: 'Room 2' }, { id: 'Room 3', text: 'Room 3' }] }
      ],
    };
  }

  render() {
    const { data, resources } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <Resources
            data={resources}
          />
          <WeekView
            startDayHour={11.5}
            endDayHour={19}
          />
          <Appointments />
          <AppointmentTooltip />
        </Scheduler>
      </Paper>
    );
  }
}
