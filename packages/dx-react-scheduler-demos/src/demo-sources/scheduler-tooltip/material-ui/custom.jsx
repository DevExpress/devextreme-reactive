import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';

import appointments from '../../../demo-data/today-appointments';

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  secondRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

const getClassByLocation = (classes, location) => {
  if (location === 'Room 1') return classes.firstRoom;
  if (location === 'Room 2') return classes.secondRoom;
  return classes.thirdRoom;
};

const Header = withStyles(style, { name: 'Header' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Header
    {...restProps}
    className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
    appointmentData={appointmentData}
  >
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(JSON.stringify(appointmentData))}
      className={classes.commandButton}
      size="large"
    >
      <MoreIcon />
    </IconButton>
  </AppointmentTooltip.Header>
));

const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <Room className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

const CommandButton = withStyles(style, { name: 'CommandButton' })(({
  classes, ...restProps
}) => (
  <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
));

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
    };
  }

  render() {
    const { data } = this.state;

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

          <Appointments />

          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            showCloseButton
          />
        </Scheduler>
      </Paper>
    );
  }
}
