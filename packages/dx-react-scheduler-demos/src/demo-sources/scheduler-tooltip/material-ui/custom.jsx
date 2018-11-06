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

import appointments from '../../../demo-data/today-appointments';

const style = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h6,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: theme.palette.background.default,
  },
  icon: {
    fontSize: '18px',
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit,
  },
  button: {
    marginLeft: theme.spacing.unit * 3,
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
    {children}
    <Button
      variant="outlined"
      color="primary"
      className={classes.button}
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
