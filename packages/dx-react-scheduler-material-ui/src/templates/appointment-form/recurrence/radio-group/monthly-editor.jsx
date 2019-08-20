import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import {
  NUMBER_EDITOR,
  handleStartDateChange,
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getRecurrenceOptions,
  changeRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';
import { getNumberLabels, getDaysOfWeek } from '../../helpers';

const styles = ({ spacing }) => ({
  textEditor: {
    width: '6em',
    marginLeft: spacing(1.875),
    marginRight: spacing(2),
  },
  input: {
    paddingBottom: spacing(2.75),
  },
  select: {
    width: '6em',
    marginLeft: spacing(1.875),
  },
  longSelect: {
    width: '8em',
    marginLeft: spacing(1.75),
  },
  label: {
    width: '4em',
  },
  grid: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
});

const getDisplayDataFromOptionsAndState = (
  recurrenceOptions, stateDayOfWeek, stateWeekNumber, stateDayNumber,
) => {
  const data = {
    weekNumber: 4,
    dayNumberTextField: stateDayNumber,
  };
  if (recurrenceOptions.bymonthday && !recurrenceOptions.bymonthday.length) {
    data.dayNumberTextField = recurrenceOptions.bymonthday;
    data.weekNumber = stateWeekNumber;
    data.dayOfWeek = stateDayOfWeek;
    data.radioGroupValue = 'onDayNumber';
  } else {
    data.radioGroupValue = 'onDayOfWeek';
    if (!recurrenceOptions.byweekday) {
      data.dayOfWeek = stateDayOfWeek;
      data.weekNumber = stateWeekNumber;
    } else {
      data.dayOfWeek = recurrenceOptions.byweekday < 6
        ? Number.parseInt(recurrenceOptions.byweekday, 10) + 1 : 0;
      if (recurrenceOptions.bymonthday && recurrenceOptions.bymonthday[0] > 0) {
        data.weekNumber = Math.trunc(recurrenceOptions.bymonthday[0] / 7);
      }
    }
  }
  return data;
};

const MonthlyEditorBase = ({
  classes,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  selectComponent: Select,
  readOnly,
  changedAppointment,
  formatDate,
  onAppointmentFieldChange,
  ...restProps
}) => {
  const [dayNumber, setDayNumber] = useState(changedAppointment.startDate.getDate());
  const [stateWeekNumber, setStateWeekNumber] = useState(
    Math.trunc((changedAppointment.startDate.getDate() - 1) / 7),
  );
  const [stateDayOfWeek, setStateDayOfWeek] = useState(changedAppointment.startDate.getDay());

  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  const {
    dayOfWeek, weekNumber, dayNumberTextField, radioGroupValue: value,
  } = getDisplayDataFromOptionsAndState(
    recurrenceOptions, stateDayOfWeek, stateWeekNumber, dayNumber,
  );

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'onDayNumber':
        setStateWeekNumber(weekNumber);
        setStateDayOfWeek(dayOfWeek);
        onAppointmentFieldChange({
          rRule: changeRecurrenceOptions({
            ...recurrenceOptions, bymonthday: dayNumber, byweekday: undefined,
          }),
        });
        break;
      case 'onDayOfWeek':
        setDayNumber(recurrenceOptions.bymonthday || dayNumber);
        handleToDayOfWeekChange(
          stateWeekNumber,
          stateDayOfWeek,
          onAppointmentFieldChange,
          recurrenceOptions,
        );
        break;
      default:
        break;
    }
  };

  return (
    <RadioGroup
      onChange={onRadioGroupValueChange}
      value={value}
      {...restProps}
    >
      <FormControlLabel
        value="onDayNumber"
        control={<Radio color="primary" />}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.grid}
          >
            <Label
              label={getMessage('onLabel')}
              className={classes.label}
            />
            <TextEditor
              disabled={value !== 'onDayNumber'}
              readOnly={readOnly}
              value={dayNumberTextField}
              className={classes.textEditor}
              id={NUMBER_EDITOR}
              onValueChange={newDayNumber => handleStartDateChange(
                newDayNumber,
                onAppointmentFieldChange,
                recurrenceOptions,
              )}
            />
            <Label
              label={getMessage('ofEveryMonthLabel')}
            />
          </Grid>
        )}
      />
      <FormControlLabel
        value="onDayOfWeek"
        control={<Radio color="primary" />}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.grid}
          >
            <Label
              label={getMessage('theLabel')}
              className={classes.label}
            />
            <Select
              disabled={value !== 'onDayOfWeek'}
              onChange={newWeekNumber => handleWeekNumberChange(
                newWeekNumber,
                onAppointmentFieldChange,
                recurrenceOptions,
              )}
              value={weekNumber}
              availableOptions={getNumberLabels(getMessage)}
              className={classes.select}
            />
            <Select
              disabled={value !== 'onDayOfWeek'}
              onChange={newWeekDay => onAppointmentFieldChange({
                rRule: changeRecurrenceOptions({
                  ...recurrenceOptions, byweekday: newWeekDay > 0 ? newWeekDay - 1 : 6,
                }),
              })}
              value={dayOfWeek}
              availableOptions={getDaysOfWeek(formatDate)}
              className={classes.longSelect}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};


MonthlyEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  formatDate: PropTypes.func.isRequired,
};

MonthlyEditorBase.defaultProps = {
  getMessage: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const MonthlyEditor = withStyles(styles)(MonthlyEditorBase, { name: 'MonthlyEditor' });
