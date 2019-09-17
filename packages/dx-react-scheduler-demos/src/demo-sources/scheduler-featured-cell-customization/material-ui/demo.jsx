import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { ViewState } from '@devexpress/dx-react-scheduler';
import classNames from 'classnames';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import WbSunny from '@material-ui/icons/WbSunny';
import FilterDrama from '@material-ui/icons/FilterDrama';
import AcUnit from '@material-ui/icons/AcUnit';
import { withStyles } from '@material-ui/core/styles';

import { appointments } from '../../../demo-data/month-appointments';

const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);

const DayScaleCell = props => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

const styles = theme => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  sun: {
    color: '#FFEE58',
  },
  cloud: {
    color: '#90A4AE',
  },
  snow: {
    color: '#4FC3F7',
  },
  sunBack: {
    backgroundColor: '#FFFDE7',
  },
  cloudBack: {
    backgroundColor: '#ECEFF1',
  },
  snowBack: {
    backgroundColor: '#E1F5FE',
  },
  opacity: {
    opacity: '0.5',
  },
  toolbar: {
    backgroundColor: '#E1F5FE',
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  flexibleSpace: {
    flex: 'none',
  },
});

const WeatherIcon = ({ classes, id }) => {
  switch (id) {
    case 0:
      return <WbSunny className={classes.sun} fontSize="large" />;
    case 1:
      return <FilterDrama className={classes.cloud} fontSize="large" />;
    case 2:
      return <AcUnit className={classes.snow} fontSize="large" />;
    default:
      return null;
  }
};

const CellBase = React.memo(({
  classes,
  startDate,
  formatDate,
  otherMonth,
}) => {
  const iconId = Math.floor(Math.random() * 10) % 3;
  const isFirstMothDay = startDate.getDate() === 1;
  const formatOptions = isFirstMothDay
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric' };
  return (
    <TableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.sunBack]: iconId === 0,
        [classes.cloudBack]: iconId === 1,
        [classes.snowBack]: iconId === 2,
        [classes.opacity]: otherMonth,
      })}
    >
      <div className={classes.content}>
        <WeatherIcon classes={classes} id={iconId} />
      </div>
      <div className={classes.text}>
        {formatDate(startDate, formatOptions)}
      </div>
    </TableCell>
  );
});

const TimeTableCell = withStyles(styles, { name: 'Cell' })(CellBase);

const Appointment = withStyles(styles, { name: 'Appointment' })((props) => {
  return <Appointments.Appointment {...props} className={props.classes.appointment} />;
});

const Root = withStyles(styles, { name: 'ToolbarRoot' })((props) => {
  return <Toolbar.Root {...props} className={props.classes.toolbar} />;
});

const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })((props) => {
  return (
    <Toolbar.FlexibleSpace {...props} className={props.classes.flexibleSpace}>
      <Typography color="primary" variant="h5">Weather Forecast</Typography>
    </Toolbar.FlexibleSpace>
  );
});

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments.slice(0, 4),
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2018-07-17"
          />
          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <Toolbar
            rootComponent={Root}
            flexibleSpaceComponent={FlexibleSpace}
          />
          <DateNavigator />

          <Appointments
            appointmentComponent={Appointment}
          />
        </Scheduler>
      </Paper>
    );
  }
}
