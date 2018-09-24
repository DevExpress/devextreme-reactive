import * as React from 'react';
import {
  Appointments,
  AppointmentTooltip,
  Scheduler,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import appointments from '../../../demo-data/today-appointments';

const styles = theme => ({
  button: {
    color: theme.palette.background.default,
    padding: 0,
  },
  text: {
    paddingTop: theme.spacing.unit,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const AppointmentBase = ({
  appointment,
  onClick,
  classes,
  toggleVisibility,
  onAppointmentMetaChange,
  ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    appointment={appointment}
  >
    <IconButton
      className={classes.button}
      onClick={({ target }) => {
        toggleVisibility();
        onAppointmentMetaChange({ target: target.parentElement.parentElement, appointment });
      }}
    >
      <InfoIcon fontSize="small" />
    </IconButton>
    <div className={classes.text}>
      {appointment.title}
    </div>
  </Appointments.Appointment>
);

const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);

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

    this.toggleVisibility = () => {
      const { visible: tooltipVisibility } = this.state;
      this.setState({ visible: !tooltipVisibility });
    };
    this.onAppointmentMetaChange = ({ appointment, target }) => {
      this.setState({ appointmentMeta: { appointment, target } });
    };
    this.myAppointment = this.myAppointment.bind(this);
  }

  myAppointment(props) {
    return (
      <Appointment
        {...props}
        toggleVisibility={this.toggleVisibility}
        onAppointmentMetaChange={this.onAppointmentMetaChange}
      />
    );
  }

  render() {
    const {
      data,
      appointmentMeta,
      visible,
    } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />

          <Appointments
            appointmentComponent={this.myAppointment}
          />

          <AppointmentTooltip
            showCloseButton
            visible={visible}
            appointmentMeta={appointmentMeta}
            onAppointmentMetaChange={this.onAppointmentMetaChange}
            onVisibilityChange={this.toggleVisibility}
          />
        </Scheduler>
      </Paper>
    );
  }
}
