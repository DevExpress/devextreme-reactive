import * as React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { teal, orange, red } from '@mui/material/colors';
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
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

const LOCATIONS = ['Room 1', 'Room 2', 'Room 3'];
const LOCATIONS_SHORT = [1, 2, 3];
const resources = [{
  fieldName: 'location',
  title: 'Location',
  instances: [
    { id: LOCATIONS[0], text: LOCATIONS[0], color: teal },
    { id: LOCATIONS[1], text: LOCATIONS[1], color: orange },
    { id: LOCATIONS[2], text: LOCATIONS[2], color: red },
  ],
}];

const PREFIX = 'Demo';
// #FOLD_BLOCK
const classes = {
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  textField: `${PREFIX}-textField`,
  locationSelector: `${PREFIX}-locationSelector`,
  button: `${PREFIX}-button`,
  selectedButton: `${PREFIX}-selectedButton`,
  longButtonText: `${PREFIX}-longButtonText`,
  shortButtonText: `${PREFIX}-shortButtonText`,
  title: `${PREFIX}-title`,
  textContainer: `${PREFIX}-textContainer`,
  time: `${PREFIX}-time`,
  text: `${PREFIX}-text`,
  container: `${PREFIX}-container`,
  weekendCell: `${PREFIX}-weekendCell`,
  weekEnd: `${PREFIX}-weekEnd`,
};
// #FOLD_BLOCK
const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(() => ({
  [`& .${classes.title}`]: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  [`& .${classes.textContainer}`]: {
    lineHeight: 1,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  [`& .${classes.time}`]: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [`& .${classes.text}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  [`& .${classes.container}`]: {
    width: '100%',
  },
}));
// #FOLD_BLOCK
const StyledTextField = styled(TextField)(({
  theme: { spacing },
}) => ({
  [`&.${classes.textField}`]: {
    width: '75px',
    marginLeft: spacing(1),
    marginTop: 0,
    marginBottom: 0,
    height: spacing(4.875),
  },
}));
// #FOLD_BLOCK
const StyledButtonGroup = styled(ButtonGroup)(({
  theme: { spacing, palette },
}) => ({
  [`&.${classes.locationSelector}`]: {
    marginLeft: spacing(1),
    height: spacing(4.875),
  },
  [`& .${classes.longButtonText}`]: {
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  [`& .${classes.shortButtonText}`]: {
    '@media (min-width: 800px)': {
      display: 'none',
    },
  },
  [`& .${classes.button}`]: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    width: spacing(10),
    '@media (max-width: 800px)': {
      width: spacing(2),
      fontSize: '0.75rem',
    },
  },
  [`& .${classes.selectedButton}`]: {
    background: palette.primary[400],
    color: palette.primary[50],
    '&:hover': {
      backgroundColor: palette.primary[500],
    },
    border: `1px solid ${palette.primary[400]}!important`,
    borderLeft: `1px solid ${palette.primary[50]}!important`,
    '&:first-of-type': {
      borderLeft: `1px solid ${palette.primary[50]}!important`,
    },
  },
}));
// #FOLD_BLOCK
const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    margin: '0 auto 0 0',
    display: 'flex',
    alignItems: 'center',
  },
}));
// #FOLD_BLOCK
const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({
  theme: { palette },
}) => ({
  [`&.${classes.weekendCell}`]: {
    backgroundColor: alpha(palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
    },
  },
}));
// #FOLD_BLOCK
const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({
  theme: { palette },
}) => ({
  [`&.${classes.weekEnd}`]: {
    backgroundColor: alpha(palette.action.disabledBackground, 0.06),
  },
}));

const AppointmentContent = ({
  data, formatDate, ...restProps
}) => (
  <StyledAppointmentsAppointmentContent {...restProps} formatDate={formatDate} data={data}>
    <div className={classes.container}>
      <div className={classes.title}>
        {data.title}
      </div>
      <div className={classes.text}>
        {data.location}
      </div>
      <div className={classes.textContainer}>
        <div className={classes.time}>
          {formatDate(data.startDate, { hour: 'numeric', minute: 'numeric' })}
        </div>
        <div className={classes.time}>
          {' - '}
        </div>
        <div className={classes.time}>
          {formatDate(data.endDate, { hour: 'numeric', minute: 'numeric' })}
        </div>
      </div>
    </div>
  </StyledAppointmentsAppointmentContent>
);

const Filter = ({ onCurrentFilterChange, currentFilter }) => (
  <StyledTextField
    size="small"
    placeholder="Filter"
    className={classes.textField}
    value={currentFilter}
    onChange={({ target }) => onCurrentFilterChange(target.value)}
    variant="outlined"
    hiddenLabel
    margin="dense"
  />
);

const handleButtonClick = (locationName, locations) => {
  if (locations.indexOf(locationName) > -1) {
    return locations.filter(location => location !== locationName);
  }
  const nextLocations = [...locations];
  nextLocations.push(locationName);
  return nextLocations;
};

const getButtonClass = (locations, location) => (
  locations.indexOf(location) > -1 && classes.selectedButton
);

const LocationSelector = ({ onLocationsChange, locations }) => (
  <StyledButtonGroup className={classes.locationSelector}>
    {LOCATIONS.map((location, index) => (
      <Button
        className={
          classNames(
            classes.button,
            classes.selectedButton,
            getButtonClass(locations, classes, location),
          )
        }
        onClick={() => onLocationsChange(handleButtonClick(location, locations))}
        key={location}
      >
        <React.Fragment>
          <span className={classes.shortButtonText}>{LOCATIONS_SHORT[index]}</span>
          <span className={classes.longButtonText}>{location}</span>
        </React.Fragment>
      </Button>
    ))}
  </StyledButtonGroup>
);

const FlexibleSpace = ({ props }) => (
  <StyledToolbarFlexibleSpace {...props} className={classes.flexibleSpace}>
    <ReduxFilterContainer />
    <ReduxLocationSelector />
  </StyledToolbarFlexibleSpace>
);

const isRestTime = date => (
  date.getDay() === 0 || date.getDay() === 6 || date.getHours() < 9 || date.getHours() >= 18
);

const TimeTableCell = (({ ...restProps }) => {
  const { startDate } = restProps;
  if (isRestTime(startDate)) {
    return <StyledWeekViewTimeTableCell {...restProps} className={classes.weekendCell} />;
  } return <StyledWeekViewTimeTableCell {...restProps} />;
});

const DayScaleCell = (({ ...restProps }) => {
  const { startDate } = restProps;
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <StyledWeekViewDayScaleCell {...restProps} className={classes.weekEnd} />;
  } return <StyledWeekViewDayScaleCell {...restProps} />;
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

      <Appointments
        appointmentContentComponent={AppointmentContent}
      />
      <Resources
        data={resources}
      />

      <Toolbar flexibleSpaceComponent={FlexibleSpace} />
      <DateNavigator />
      <ViewSwitcher />
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
