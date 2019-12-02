import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, GroupingState, IntegratedGrouping } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DayView,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const appointments = [{
  title: 'Website Re-Design Plan',
  startDate: new Date(2018, 5, 27, 12, 35),
  endDate: new Date(2018, 5, 27, 15, 0),
  id: 0,
  members: 1,
  location: 'Room 1',
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2018, 5, 26, 12, 35),
  endDate: new Date(2018, 5, 26, 15, 0),
  id: 1,
  members: 2,
  location: 'Room 2',
}, {
  title: 'Website Re-Design Plan',
  startDate: new Date(2018, 5, 25, 12, 35),
  endDate: new Date(2018, 5, 25, 15, 0),
  id: 2,
  members: 1,
  location: 'Room 1',
  allDay: true,
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2018, 5, 26, 12, 35),
  endDate: new Date(2018, 5, 26, 15, 0),
  id: 3,
  members: 2,
  location: 'Room 2',
  allDay: true,
}];

const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});

const ResourceSwitcher = withStyles(styles, { name: 'ResourceSwitcher' })(
  ({
    mainResourceName, onChange, classes, resources,
  }) => (
    <div className={classes.container}>
      <div className={classes.text}>
        Main resource name:
      </div>
      <Select
        value={mainResourceName}
        onChange={e => onChange(e.target.value)}
      >
        {resources.map(resource => (
          <MenuItem key={resource.fieldName} value={resource.fieldName}>
            {resource.title}
          </MenuItem>
        ))}
      </Select>
    </div>
  ),
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      mainResourceName: 'members',
      resources: [
        {
          fieldName: 'location',
          title: 'Location',
          instances: [
            { id: 'Room 1', text: 'Room 1' },
            { id: 'Room 2', text: 'Room 2' },
          ],
        },
        {
          fieldName: 'members',
          title: 'Members',
          instances: [
            { id: 1, text: 'Andrew Glover' },
            { id: 2, text: 'Arnie Schwartz' },
          ],
        },
        {
          fieldName: 'location1',
          instances: [
            { id: 'Room 3', text: 'Room 3' },
            { id: 'Room 4', text: 'Room 4' },
          ],
        },
        {
          fieldName: 'location2',
          title: 'Location',
          instances: [
            { id: 'Room 5', text: 'Room 5' },
            { id: 'Room 6', text: 'Room 6' },
          ],
        },
        {
          fieldName: 'location3',
          title: 'Location',
          instances: [
            { id: 'Room 7', text: 'Room 7' },
            { id: 'Room 8', text: 'Room 8' },
          ],
        },
      ],
    };

    this.changeMainResource = this.changeMainResource.bind(this);
  }

  changeMainResource(mainResourceName) {
    this.setState({ mainResourceName });
  }

  render() {
    const { data, resources, mainResourceName } = this.state;

    return (
      <>
        <ResourceSwitcher
          resources={resources}
          mainResourceName={mainResourceName}
          onChange={this.changeMainResource}
        />

        <Paper>
          <Scheduler
            data={data}
          >
            <ViewState
              defaultCurrentDate="2018-06-27"
            />
            <GroupingState
              grouping={[{
                resourceName: 'members',
              }]}
            />
            <WeekView
              startDayHour={11.5}
              endDayHour={16}
            />
            <DayView
              startDayHour={11.5}
              endDayHour={16}
            />
            <MonthView />
            <AllDayPanel />
            <Appointments />
            <Resources
              data={resources}
              mainResourceName={mainResourceName}
            />
            <IntegratedGrouping />
            <AppointmentTooltip />
            <GroupingPanel />
            <Toolbar />
            <ViewSwitcher />
          </Scheduler>
        </Paper>
      </>
    );
  }
}
