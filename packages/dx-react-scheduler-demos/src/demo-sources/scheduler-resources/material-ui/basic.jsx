import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const PREFIX = 'Demo';

const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  [`& .${classes.text}`]: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
}));

const appointments = [{
  title: 'Website Re-Design Plan',
  startDate: new Date(2018, 5, 25, 12, 35),
  endDate: new Date(2018, 5, 25, 15, 0),
  id: 0,
  members: [1, 3, 5],
  location: 'Room 1',
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2018, 5, 26, 12, 35),
  endDate: new Date(2018, 5, 26, 15, 0),
  id: 1,
  members: [2, 4],
  location: 'Room 2',
}, {
  title: 'Install New Router in Dev Room',
  startDate: new Date(2018, 5, 27, 12, 35),
  endDate: new Date(2018, 5, 27, 15, 0),
  id: 2,
  members: [3],
  location: 'Room 3',
}, {
  title: 'Approve Personal Computer Upgrade Plan',
  startDate: new Date(2018, 5, 28, 12, 35),
  endDate: new Date(2018, 5, 28, 15, 0),
  id: 3,
  members: [4, 1],
  location: 'Room 4',
}, {
  title: 'Final Budget Review',
  startDate: new Date(2018, 5, 29, 12, 35),
  endDate: new Date(2018, 5, 29, 15, 0),
  id: 4,
  members: [5, 1, 3],
  location: 'Room 5',
}];

const ResourceSwitcher = (
  ({
    mainResourceName, onChange, resources,
  }) => (
    <StyledDiv className={classes.container}>
      <div className={classes.text}>
        Main resource name:
      </div>
      <Select
        variant="standard"
        value={mainResourceName}
        onChange={e => onChange(e.target.value)}
      >
        {resources.map(resource => (
          <MenuItem key={resource.fieldName} value={resource.fieldName}>
            {resource.title}
          </MenuItem>
        ))}
      </Select>
    </StyledDiv>
  )
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
            { id: 'Room 3', text: 'Room 3' },
            { id: 'Room 4', text: 'Room 4' },
            { id: 'Room 5', text: 'Room 5' },
          ],
        },
        {
          fieldName: 'members',
          title: 'Members',
          allowMultiple: true,
          instances: [
            { id: 1, text: 'Andrew Glover' },
            { id: 2, text: 'Arnie Schwartz' },
            { id: 3, text: 'John Heart' },
            { id: 4, text: 'Taylor Riley' },
            { id: 5, text: 'Brad Farkus' },
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
      <React.Fragment>
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
            <WeekView
              startDayHour={11.5}
              endDayHour={16}
            />
            <Appointments />
            <AppointmentTooltip />
            <Resources
              data={resources}
              mainResourceName={mainResourceName}
            />
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
