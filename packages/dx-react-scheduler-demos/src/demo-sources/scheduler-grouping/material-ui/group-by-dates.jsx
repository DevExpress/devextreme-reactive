import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { green, lightBlue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  GroupingPanel,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { data as appointments } from '../../../demo-data/grouping';

const isWeekOrMonthView = viewName => viewName === 'Week' || viewName === 'Month';

const priorityData = [
  { text: 'Low Priority', id: 1, color: lightBlue },
  { text: 'High Priority', id: 2, color: green },
];

const styles = ({ spacing, palette, typography }) => ({
  formControlLabel: {
    padding: spacing(2),
    paddingLeft: spacing(10),
  },
  text: {
    ...typography.caption,
    color: palette.text.secondary,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
});

const GroupOrderSwitcher = withStyles(styles, { name: 'ResourceSwitcher' })(
  ({
    isGroupByDate, onChange, classes,
  }) => (
    <FormControlLabel
      control={
        <Checkbox checked={isGroupByDate} onChange={onChange} color="primary" />
      }
      label="Group by Date First"
      className={classes.formControlLabel}
      classes={{ label: classes.text }}
    />
  ),
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments.filter(appointment => appointment.priorityId < 3),
      resources: [{
        fieldName: 'priorityId',
        title: 'Priority',
        instances: priorityData,
      }],
      grouping: [{
        resourceName: 'priorityId',
      }],
      groupByDate: isWeekOrMonthView,
      isGroupByDate: true,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onGroupOrderChange = () => {
      const { isGroupByDate } = this.state;
      this.setState({
        isGroupByDate: !isGroupByDate,
        groupByDate: isGroupByDate ? undefined : isWeekOrMonthView,
      });
    };
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      data, resources, grouping, groupByDate, isGroupByDate,
    } = this.state;

    return (
      <>
        <GroupOrderSwitcher isGroupByDate={isGroupByDate} onChange={this.onGroupOrderChange} />
        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentDate="2018-05-30"
            />
            <EditingState
              onCommitChanges={this.commitChanges}
            />
            <GroupingState
              grouping={grouping}
              groupByDate={groupByDate}
            />

            <WeekView
              startDayHour={8.5}
              endDayHour={17}
              excludedDays={[0, 6]}
            />
            <MonthView />

            <Appointments />
            <Resources
              data={resources}
              mainResourceName="priorityId"
            />
            <IntegratedGrouping />
            <IntegratedEditing />

            <AppointmentTooltip />
            <AppointmentForm />

            <Toolbar />
            <ViewSwitcher />
            <GroupingPanel />
            <DragDropProvider />
          </Scheduler>
        </Paper>
      </>
    );
  }
}
