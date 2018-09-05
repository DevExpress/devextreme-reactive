import { Appointments, AppointmentTooltip, Scheduler, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import appointments from '../../../demo-data/today-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      visible: false,
      appointmentMeta: {
        target: null,
        appointment: {},
      },
    };

    this.toggleVisible = () => {
      const { visible: tooltipVisible } = this.state;
      this.setState({ visible: !tooltipVisible });
    };

    this.setRef = (ref) => {
      const { appointmentMeta } = this.state;
      this.setState({ appointmentMeta: { ...appointmentMeta, target: ref } });
    };

    this.onAppointmentMetaChange = ({ appointment }) => {
      const { target } = this.state;
      this.setState({ appointmentMeta: { appointment, target } });
    };

    this.onVisibleChange = (visible) => {
      this.setState({ visible });
    };
  }

  render() {
    const {
      data,
      appointmentMeta,
      visible,
    } = this.state;

    return (
      <React.Fragment>
        <Paper>
          <div style={{ height: '200px' }} ref={this.setRef}>
            <Button onClick={this.toggleVisible}>
              Open Appointment
            </Button>
            <Button onClick={() => this.onAppointmentMetaChange({ target: null, appointment: {} })}>
              Reset Appointment
            </Button>
            <div style={{ color: appointmentMeta.appointment.startDate ? 'green' : 'red' }}>
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
              appointmentMeta={appointmentMeta}

              onAppointmentMetaChange={this.onAppointmentMetaChange}
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
