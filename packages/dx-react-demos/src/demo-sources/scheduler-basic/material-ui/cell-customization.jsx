import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    backgroundColor: theme.palette.primary[50],
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: theme.palette.primary[100],
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

export const CustomTableCell = withStyles(styles, { name: 'Cell' })(CustomTableCellBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
          />
        </Scheduler>
      </Paper>
    );
  }
}
