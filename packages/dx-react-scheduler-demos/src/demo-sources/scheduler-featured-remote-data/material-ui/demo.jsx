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
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData/Get';

const makeQueryString = (startViewDate, endViewDate) => {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  const start = moment(startViewDate).format(format);
  const end = moment(endViewDate).format(format);
  return encodeURI(`${URL}?filter=[["EndDate", ">", "${start}"],["StartDate", "<", "${end}"]]`);
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
  ({ children, classes }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);

const getStartDate = appointment => appointment.StartDate;
const getEndDate = appointment => appointment.EndDate;
const getTitle = appointment => appointment.Text;

const DataLoader = ({ loadData }) => (
  <Plugin>
    <Template name="body">
      <TemplatePlaceholder />
      <TemplateConnector>
        {({ startViewDate, endViewDate }) => {
          loadData(startViewDate, endViewDate);
          return null;
        }}
      </TemplateConnector>
    </Template>

  </Plugin>
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
    this.loadData = this.loadData.bind(this);
  }

  loadData(startViewDate, endViewDate) {
    const queryString = makeQueryString(startViewDate, endViewDate);
    if (queryString === this.lastQuery) {
      return;
    }
    fetch(queryString)
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({
          data,
          loading: false,
        });
      })
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {
    const {
      data,
      loading,
    } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          getStartDate={getStartDate}
          getEndDate={getEndDate}
          getTitle={getTitle}
        >
          <ViewState
            defaultCurrentDate="2017-05-23"
          />
          <WeekView
            startDayHour={8}
          />
          <MonthView />
          <Appointments />
          <Toolbar
            {...loading ? { rootComponent: ToolbarWithLoading } : null}
          />
          <DateNavigator />
          <DataLoader loadData={this.loadData} />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    );
  }
}
