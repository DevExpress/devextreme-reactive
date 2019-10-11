import * as React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { teal, orange, red } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'clsx';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  DayView,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

const styles = ({ spacing, palette }) => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    width: '100px',
    marginLeft: spacing(1),
    marginTop: 0,
    marginBottom: 0,
    height: spacing(4.875),
  },
  locationSelector: {
    marginLeft: spacing(1),
    height: spacing(4.875),
  },
  button: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    width: spacing(10),
  },
  selectedButton: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    width: spacing(10),
    background: palette.primary[400],
    color: palette.primary[50],
    '&:hover': {
      backgroundColor: palette.primary[500],
    },
    border: `1px solid ${palette.primary[400]}!important`,
    borderLeft: `1px solid ${palette.primary[50]}!important`,
    '&:first-child': {
      borderLeft: `1px solid ${palette.primary[50]}!important`,
    },
  },
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    lineHeight: 1,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  container: {
    width: '100%',
  },
  weekendCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
  },
  weekEnd: {
    backgroundColor: fade(palette.action.disabledBackground, 0.06),
  },
  firstRoomAppointment: {
    backgroundColor: teal[400],
    '&:hover': {
      backgroundColor: teal[500],
    },
  },
  secondRoomAppointment: {
    backgroundColor: orange[400],
    '&:hover': {
      backgroundColor: orange[500],
    },
  },
  thirdRoomAppointment: {
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[500],
    },
  },
});

const LOCATIONS = ['Room 1', 'Room 2', 'Room 3'];

const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, data, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    data={data}
    className={classNames({
      [classes.firstRoomAppointment]: data.location === LOCATIONS[0],
      [classes.secondRoomAppointment]: data.location === LOCATIONS[1],
      [classes.thirdRoomAppointment]: data.location === LOCATIONS[2],
    })}
  />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({
  classes, data, formatDate, ...restProps
}) => (
  <Appointments.AppointmentContent {...restProps} formatDate={formatDate} data={data}>
    <div className={classes.container}>
      <div className={classes.title}>
        {data.title}
      </div>
      <div className={classes.text}>
        {data.location}
      </div>
      <div className={classes.textContainer}>
        <div className={classes.time}>
          {formatDate(data.startDate.toString(), { hour: 'numeric', minute: 'numeric' })}
        </div>
        <div className={classes.time}>
          {' - '}
        </div>
        <div className={classes.time}>
          {formatDate(data.endDate.toString(), { hour: 'numeric', minute: 'numeric' })}
        </div>
      </div>
    </div>
  </Appointments.AppointmentContent>
));

const Filter = withStyles(styles, { name: 'TextField' })(({ onCurrentFilterChange, currentFilter, classes }) => (
  <TextField
    placeholder="Filter"
    className={classes.textField}
    value={currentFilter}
    onChange={({ target }) => onCurrentFilterChange(target.value)}
    variant="outlined"
    hiddenLabel
    margin="dense"
  />
));

const handleButtonClick = (locationName, locations) => {
  if (locations.indexOf(locationName) > -1) {
    return locations.filter(location => location !== locationName);
  }
  const nextLocations = [...locations];
  nextLocations.push(locationName);
  return nextLocations;
};

const getButtonClass = (locations, classes, location) => (
  locations.indexOf(location) > -1 ? classes.selectedButton : classes.button
);

const LocationSelector = withStyles(styles, { name: 'LocationSelector' })(({ onLocationsChange, locations, classes }) => (
  <ButtonGroup className={classes.locationSelector}>
    {LOCATIONS.map(location => (
      <Button
        className={getButtonClass(locations, classes, location)}
        onClick={() => onLocationsChange(handleButtonClick(location, locations))}
        key={location}
      >
        {location}
      </Button>
    ))}
  </ButtonGroup>
));

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(
  ({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <ReduxFilterContainer />
      <ReduxLocationSelector />
    </Toolbar.FlexibleSpace>
  ),
);

const isRestTime = date => (
  date.getDay() === 0 || date.getDay() === 6 || date.getHours() < 9 || date.getHours() >= 18
);

const TimeTableCell = withStyles(styles, { name: 'TimeTableCell' })(({ classes, ...restProps }) => {
  const { startDate } = restProps;
  if (isRestTime(startDate)) {
    return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
  } return <WeekView.TimeTableCell {...restProps} />;
});

const DayScaleCell = withStyles(styles, { name: 'DayScaleCell' })(({ classes, ...restProps }) => {
  const { startDate } = restProps;
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...restProps} className={classes.weekEnd} />;
  } return <WeekView.DayScaleCell {...restProps} />;
});

const SCHEDULER_STATE_CHANGE_ACTION = 'SCHEDULER_STATE_CHANGE';

const SchedulerContainer = ({
  data,
  currentDate, onCurrentDateChange,
  currentViewName, onCurrentViewNameChange,
}) => (
  <Paper>
    <Scheduler
      data={data}
      height={660}
    >
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={onCurrentDateChange}
        currentViewName={currentViewName}
        onCurrentViewNameChange={onCurrentViewNameChange}
      />
      <DayView
        startDayHour={9}
        endDayHour={19}
      />
      <WeekView
        startDayHour={8}
        endDayHour={19}
        timeTableCellComponent={TimeTableCell}
        dayScaleCellComponent={DayScaleCell}
      />
      <Toolbar flexibleSpaceComponent={FlexibleSpace} />
      <DateNavigator />
      <ViewSwitcher />
      <Appointments
        appointmentComponent={Appointment}
        appointmentContentComponent={AppointmentContent}
      />
    </Scheduler>
  </Paper>
);


const schedulerInitialState = {
  data: appointments,
  currentDate: '2018-06-27',
  currentViewName: 'Week',
  currentFilter: '',
  locations: LOCATIONS,
};

const schedulerReducer = (state = schedulerInitialState, action) => {
  if (action.type === SCHEDULER_STATE_CHANGE_ACTION) {
    return {
      ...state,
      [action.payload.partialStateName]: action.payload.partialStateValue,
    };
  }
  return state;
};

export const createSchedulerAction = (partialStateName, partialStateValue) => ({
  type: SCHEDULER_STATE_CHANGE_ACTION,
  payload: {
    partialStateName,
    partialStateValue,
  },
});

const mapStateToProps = (state) => {
  let data = state.data.filter(dataItem => (
    state.locations.indexOf(dataItem.location) > -1
  ));
  const lowerCaseFilter = state.currentFilter.toLowerCase();
  data = data.filter(dataItem => (
    dataItem.title.toLowerCase().includes(lowerCaseFilter)
    || dataItem.location.toLowerCase().includes(lowerCaseFilter)
  ));
  return { ...state, data };
};

const mapDispatchToProps = dispatch => ({
  onCurrentDateChange: currentDate => dispatch(createSchedulerAction('currentDate', currentDate)),
  onCurrentViewNameChange: currentViewName => dispatch(createSchedulerAction('currentViewName', currentViewName)),
  onCurrentFilterChange: currentFilter => dispatch(createSchedulerAction('currentFilter', currentFilter)),
  onLocationsChange: locations => dispatch(createSchedulerAction('locations', locations)),
});

const ReduxSchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(SchedulerContainer);
const ReduxFilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);
const ReduxLocationSelector = connect(mapStateToProps, mapDispatchToProps)(LocationSelector);

const store = createStore(
  schedulerReducer,
  // Enabling Redux DevTools Extension (https://github.com/zalmoxisus/redux-devtools-extension)
  // eslint-disable-next-line no-underscore-dangle
  typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
  // eslint-enable
);

export default () => (
  <Provider store={store}>
    <ReduxSchedulerContainer />
  </Provider>
);
