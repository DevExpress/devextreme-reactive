import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments, resourcesData } from '../../../demo-data/resources';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [
        {
          fieldName: 'roomId',
          allowMultiple: true,
          title: 'Room',
          items: resourcesData,
        },
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
          <ViewState
            defaultCurrentDate="2017-05-25"
          />
          <Resources
            data={resources}
          />
          <MonthView />
          <Appointments />
          <AppointmentTooltip />
        </Scheduler>
      </Paper>
    );
  }
}
