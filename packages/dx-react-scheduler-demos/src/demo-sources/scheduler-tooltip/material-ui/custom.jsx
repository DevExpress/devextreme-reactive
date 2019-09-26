import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import appointments from '../../../demo-data/today-appointments';

const style = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h6,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  text: {
    ...theme.typography.body2,
    marginBottom: theme.spacing(2),
  },
  icon: {
    fontSize: '18px',
    paddingRight: theme.spacing(1),
  },
});

const Header = withStyles(style, { name: 'Header' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Header
    {...restProps}
    className={classes.header}
  >
    <span role="img" aria-label="Clock" className={classes.icon}>🕒</span>
    <div className={classes.title}>
      {appointmentData.title}
    </div>
  </AppointmentTooltip.Header>
));

const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps}>
    <div className={classes.text}>
      {moment(appointmentData.startDate).format('h:mm A')}
      {' - '}
      {moment(appointmentData.endDate).format('h:mm A')}
    </div>
    <Button
      variant="outlined"
      color="primary"
      // eslint-disable-next-line no-alert
      onClick={() => alert(JSON.stringify(appointmentData))}
    >
      Details
    </Button>
  </AppointmentTooltip.Content>
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
          />
        </Scheduler>
      </Paper>
    );
  }
}
