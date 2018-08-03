import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      tooltipData: {},
      tooltipTarget: {},
      tooltipVisible: false,
    };
  }

  tooltip() {
    const { tooltipData, tooltipTarget, tooltipVisible } = this.state;
    return (
      <AppointmentTooltip.Tooltip
        visible={tooltipVisible}
        data={tooltipData}
        target={tooltipTarget}
      />
    );
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <button
          type="button"
          onClick={() => {
            const appointmentData = data[0];
            this.setState({
              tooltipVisible: true,
              tooltipData: appointmentData,
              tooltipTarget: document.getElementsByClassName('appointment')[0],
            });
          }}
        >
          Show Tooltip
        </button>
        <Scheduler
          data={data}
        >
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />

          <Appointments />

          <AppointmentTooltip
            // uncontrolled: there isn't any props
            // controlled
            visible
            appointmentData
            target
          />
        </Scheduler>
      </Paper>
    );
  }
}
