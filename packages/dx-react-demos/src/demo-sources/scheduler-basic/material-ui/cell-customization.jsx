import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';

const weekday = new Array(7);
weekday[0] = 'Sun';
weekday[1] = 'Mon';
weekday[2] = 'Tue';
weekday[3] = 'Wed';
weekday[4] = 'Thu';
weekday[5] = 'Fri';
weekday[6] = 'Sat';

const tableCellstyles = theme => ({
  cell: {
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    backgroundColor: theme.palette.primary[50],
    '&:hover': {
      backgroundColor: theme.palette.primary[100],
    },
    '&:focus': {
      backgroundColor: theme.palette.primary[200],
      outline: 0,
    },
  },
});

const CustomTableCellBase = ({ day, classes, ...restProps }) => {
  const currentDay = new Date(day);
  if (currentDay.getDay() === 6 || currentDay.getDay() === 0) {
    return (<WeekView.DateTableCell {...restProps} className={classes.cell} />);
  }
  return <WeekView.DateTableCell {...restProps} />;
};

export const CustomTableCell = withStyles(tableCellstyles, { name: 'Cell' })(CustomTableCellBase);

const dayPanelStyles = theme => ({
  currentDay: {
    backgroundColor: theme.palette.primary[400],
  },
  dayOfWeek: {
    ...theme.typography.caption,
    margin: 0,
    color: theme.palette.primary[400],
  },
  dayOfMonth: {
    ...theme.typography.display1,
    color: theme.palette.primary[400],
  },
});

const CustomDayPanelCellBase = ({ date, classes, ...restProps }) => {
  const currentDate = new Date(date);
  if (new Date().getDate() === currentDate.getDate()) {
    return (
      <WeekView.DayPanelCell date={date}>
        <p className={classes.dayOfWeek}>
          {weekday[currentDate.getDay()]}
        </p>
        <span className={classes.dayOfMonth}>
          {currentDate.getDate()}
        </span>
      </WeekView.DayPanelCell>
    );
  }
  return <WeekView.DayPanelCell {...restProps} date={date} />;
};

export const CustomDayPanelCell = withStyles(dayPanelStyles, { name: 'DayPanelCell' })(CustomDayPanelCellBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [{
        title: 'Website Re-Design Plan',
        startDate: new Date(2018, 5, 25, 9),
        endDate: new Date(2018, 5, 25, 10),
      }, {
        title: 'New Brochures',
        startDate: new Date(2018, 5, 27, 10, 15),
        endDate: new Date(2018, 5, 25, 15),
      }],
    };
  }
  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          currentDate={new Date(2018, 5, 25)}
        >
          <WeekView
            startDayHour={8}
            endDayHour={18}
            firstDayOfWeek={0}
            dateTableCellComponent={CustomTableCell}
            dayPanelCellComponent={CustomDayPanelCell}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
