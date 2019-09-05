import * as React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
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

const styles = ({ spacing }) => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  textField: {
    width: '150px',
    marginLeft: spacing(2),
  },
});

const Appointment = ({ data, ...restProps }) => {
  if (data.location === 'Room 1') {
    return <Appointments.Appointment {...restProps} style={{ backgroundColor: '#26A69A' }} />;
  }
  if (data.location === 'Room 2') {
    return <Appointments.Appointment {...restProps} style={{ backgroundColor: '#FFA726' }} />;
  }
  return <Appointments.Appointment {...restProps} style={{ backgroundColor: '#EF5350' }} />;
};

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

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(
  ({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <ReduxFilterContainer />
    </Toolbar.FlexibleSpace>
  ),
);

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
        startDayHour={9}
        endDayHour={19}
      />
      <Toolbar flexibleSpaceComponent={FlexibleSpace} />
      <DateNavigator />
      <ViewSwitcher />
      <Appointments
        appointmentComponent={Appointment}
      />
    </Scheduler>
  </Paper>
);


const schedulerInitialState = {
  data: appointments,
  currentDate: '2018-06-27',
  currentViewName: 'Week',
  currentFilter: '',
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
  const lowerCaseFilter = state.currentFilter.toLowerCase();
  const data = state.data.filter(dataItem => (
    dataItem.title.toLowerCase().includes(lowerCaseFilter)
    || dataItem.location.toLowerCase().includes(lowerCaseFilter)
  ));
  return { ...state, data };
};

const mapDispatchToProps = dispatch => ({
  onCurrentDateChange: currentDate => dispatch(createSchedulerAction('currentDate', currentDate)),
  onCurrentViewNameChange: currentViewName => dispatch(createSchedulerAction('currentViewName', currentViewName)),
  onCurrentFilterChange: currentFilter => dispatch(createSchedulerAction('currentFilter', currentFilter)),
});

const ReduxSchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(SchedulerContainer);
const ReduxFilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

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
