import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

const getId = appointment => appointment.id;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ deleted, added }) {
    let { data } = this.state;
    if (deleted) {
      data = data.filter(appointment => deleted !== appointment.id);
    }
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [
        ...data,
        ...[{
          ...added,
          id: startingAddedId,
        }],
      ];
    }
    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          getId={getId}
        >
          <EditingState
            onCommitChanges={this.commitChanges}
            // disableAdding
            // disableDeleting
          />

          <WeekView
            startDayHour={9}
            endDayHour={19}
          />

          <Appointments />

          <AppointmentTooltip
            showCloseButton
            showDeleteButton
          />
        </Scheduler>
      </Paper>
    );
  }
}
