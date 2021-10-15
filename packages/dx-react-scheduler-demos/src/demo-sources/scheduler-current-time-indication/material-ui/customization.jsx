import * as React from 'react';
import {
  Appointments,
  Scheduler,
  WeekView,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import { teal } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import classNames from 'clsx';

import appointments from '../../../demo-data/today-appointments';

// #FOLD_BLOCK
const useStyles = makeStyles(theme => ({
  line: {
    height: '2px',
    borderTop: `2px ${theme.palette.primary.main} dotted`,
    width: '100%',
    transform: 'translate(0, -1px)',
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    background: theme.palette.primary.main,
  },
  nowIndicator: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: ({ top }) => top,
  },
  shadedCell: {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.20),
      outline: 0,
    },
  },
  shadedPart: {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    position: 'absolute',
    height: ({ shadedHeight }) => shadedHeight,
    width: '100%',
    left: 0,
    top: 0,
    'td:focus &': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
  },
  appointment: {
    backgroundColor: teal[300],
    '&:hover': {
      backgroundColor: teal[400],
    },
  },
  shadedAppointment: {
    backgroundColor: teal[200],
    '&:hover': {
      backgroundColor: teal[300],
    },
  },
}));
// #FOLD_BLOCK
const TimeIndicator = ({
  top, ...restProps
  // #FOLD_BLOCK
}) => {
  const classes = useStyles({ top });
  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

// #FOLD_BLOCK
const TimeTableCell = ({
  currentTimeIndicatorPosition, isShaded, ...restProps
  // #FOLD_BLOCK
}) => {
  const classes = useStyles({ shadedHeight: currentTimeIndicatorPosition });
  const isNow = !!currentTimeIndicatorPosition;
  return (
    <WeekView.TimeTableCell
      isShaded={isShaded && !isNow}
      currentTimeIndicatorPosition={currentTimeIndicatorPosition}
      className={classNames({
        [classes.shadedCell]: isShaded && !isNow,
      })}
      {...restProps}
    >
      {isNow && isShaded && (
        <div className={classes.shadedPart} />
      )}
    </WeekView.TimeTableCell>
  );
};

// #FOLD_BLOCK
const Appointment = ({
  isShaded, ...restProps
  // #FOLD_BLOCK
}) => {
  const classes = useStyles();
  return (
    <Appointments.Appointment
      className={classNames({
        [classes.appointment]: true,
        [classes.shadedAppointment]: isShaded,
      })}
      {...restProps}
    />
  );
};

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
            timeTableCellComponent={TimeTableCell}
          />
          <Appointments
            appointmentComponent={Appointment}
          />
          <CurrentTimeIndicator
            indicatorComponent={TimeIndicator}
            shadePreviousCells
            shadePreviousAppointments
          />
        </Scheduler>
      </Paper>
    );
  }
}
