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
    paddingTop: theme.spacing(1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const AppointmentBase = ({
  children,
  data,
  onClick,
  classes,
  toggleVisibility,
  onAppointmentMetaChange,
  ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
  >
    <>
      <IconButton
        className={classes.button}
        onClick={({ target }) => {
          toggleVisibility();
          onAppointmentMetaChange({ target: target.parentElement.parentElement, data });
        }}
      >
        <InfoIcon fontSize="small" />
      </IconButton>
      {children}
    </>
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
        data: {},
      },
    };

    this.toggleVisibility = () => {
      const { visible: tooltipVisibility } = this.state;
      this.setState({ visible: !tooltipVisibility });
    };
    this.onAppointmentMetaChange = ({ data, target }) => {
      this.setState({ appointmentMeta: { data, target } });
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
          height={660}
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
            onVisibilityChange={this.toggleVisibility}
            appointmentMeta={appointmentMeta}
            onAppointmentMetaChange={this.onAppointmentMetaChange}
          />
        </Scheduler>
      </Paper>
    );
  }
}
