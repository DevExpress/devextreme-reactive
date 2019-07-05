import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData/Get';

const makeQueryString = (currentDate, currentViewName) => {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  const start = moment(currentDate).startOf(currentViewName.toLowerCase());
  const end = start.clone().endOf(currentViewName.toLowerCase());
  return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
};

const styles = {
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);

const mapAppointmentData = appointment => ({
  ...appointment,
  startDate: appointment.StartDate,
  endDate: appointment.EndDate,
  title: appointment.Text,
});

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentDate: '2017-05-23',
      currentViewName: 'Day',
    };
    this.loadData = this.loadData.bind(this);
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName, loading: true });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate, loading: true });
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { currentDate, currentViewName } = this.state;
    const queryString = makeQueryString(currentDate, currentViewName);
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }
    fetch(queryString)
      .then(response => response.json())
      .then(({ data }) => {
        setTimeout(() => {
          this.setState({
            data,
            loading: false,
          });
        }, 600);
      })
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {
    const {
      data, loading,
      currentDate, currentViewName,
    } = this.state;

    const formattedData = data
      ? data.map(mapAppointmentData) : [];

    return (
      <Paper>
        <Scheduler
          data={formattedData}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={9}
            endDayHour={18}
          />
          <Appointments />
          <Toolbar
            {...loading ? { rootComponent: ToolbarWithLoading } : null}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
          />
          <AppointmentForm readOnly />
        </Scheduler>
      </Paper>
    );
  }
}
