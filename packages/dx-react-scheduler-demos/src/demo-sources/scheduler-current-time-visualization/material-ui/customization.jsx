import * as React from 'react';
import {
  Appointments,
  Scheduler,
  WeekView,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { fade } from '@material-ui/core/styles/colorManipulator';
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
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.20),
      outline: 0,
    },
  },
  shadedPart: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    position: 'absolute',
    height: ({ shadedHeight }) => shadedHeight,
    width: '100%',
    left: 0,
    top: 0,
    'td:focus &': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
  },
  appointment: {
    backgroundColor: teal[300],
    '&:hover': {
      backgroundColor: teal[400],
    },
  },
  reducedBrightness: {
    backgroundColor: teal[200],
    '&:hover': {
      backgroundColor: teal[300],
    },
  },
}));

const getIndicatorTop = (startDate, endDate, currentTime) => {
  if (!startDate || !endDate || !currentTime) return '0';
  return `${((currentTime.getTime() - startDate.getTime()) * 100) / (endDate.getTime() - startDate.getTime())}%`;
};

const TimeIndicator = ({
  startDate, endDate, currentTime, ...restProps
}) => {
  const classes = useStyles({ top: getIndicatorTop(startDate, endDate, currentTime) });
  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

const TimeTableCell = ({
  startDate, endDate, currentTime, isShaded, ...restProps
}) => {
  const classes = useStyles({ shadedHeight: getIndicatorTop(startDate, endDate, currentTime) });
  const isNow = !!currentTime && currentTime.getTime() <= endDate.getTime()
    && currentTime.getTime() > startDate.getTime();
  return (
    <WeekView.TimeTableCell
      startDate={startDate}
      endDate={endDate}
      currentTime={currentTime}
      isShaded={isShaded && !isNow}
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

const Appointment = ({
  isBrightnessReduced, ...restProps
}) => {
  const classes = useStyles();
  return (
    <Appointments.Appointment
      className={classNames({
        [classes.appointment]: true,
        [classes.reducedBrightness]: isBrightnessReduced,
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
            shadePastCells
            reduceBrightnessOfPastAppointments
          />
        </Scheduler>
      </Paper>
    );
  }
}
