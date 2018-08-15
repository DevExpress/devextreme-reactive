import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@material-ui/core/Button';

import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      visible: false,
      target: null,
      appointment: {},
    };

    this.toggleVisible = () => {
      const { visible: vis } = this.state;
      this.setState({ visible: !vis });
    };

    this.setRef = (ref) => {
      this.setState({ target: ref });
    };

    this.onAppointmentChange = (appointment) => {
      this.setState({ appointment });
    };

    this.onVisibleChange = (visible) => {
      this.setState({ visible });
    };
    this.onTargetChange = () => { };
  }

  render() {
    const {
      data,
      appointment,
      visible,
      target,
    } = this.state;

    return (
      <React.Fragment>
        <Paper>
          <div style={{ height: '200px' }} ref={this.setRef}>
            <Button onClick={this.toggleVisible}>
              Open Appointment
            </Button>
            <Button onClick={() => this.onAppointmentChange({})}>
              Reset Appointment
            </Button>
            <div style={{ color: appointment.startDate ? 'green' : 'red' }}>
              Appointment Ready
            </div>
          </div>
        </Paper>
        <Paper>
          <Scheduler
            data={data}
          >
            <WeekView
              startDayHour={9}
              endDayHour={19}
            />

            <Appointments />

            <AppointmentTooltip
              visible={visible}
              target={target}
              appointment={appointment}

              onAppointmentChange={this.onAppointmentChange}
              onTargetChange={this.onTargetChange}
              onVisibleChange={this.onVisibleChange}

              showCloseButton
              showDeleteButton
              showOpenButton
            />
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
