import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  NUMBER_EDITOR,
  handleStartDateChange,
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getRecurrenceOptions,
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
  switcher: {
    width: '6em',
    marginLeft: spacing(1.875),
  },
  longSwitcher: {
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

const MonthlyEditorBase = ({
  classes,
  onExecute,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  onRecurrenceOptionsChange,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  switcherComponent: Switcher,
  readOnly,
  changedAppointment,
  formatDate,
  ...restProps
}) => {
  const [dayNumber, setDayNumber] = useState(changedAppointment.startDate.getDate());
  const [stateWeekNumber, setStateWeekNumber] = useState(
    Math.trunc((changedAppointment.startDate.getDate() - 1) / 7),
  );
  const [stateDayOfWeek, setStateDayOfWeek] = useState(changedAppointment.startDate.getDay());

  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  let value;
  let dayNumberTextField = dayNumber;
  // The last week in a month
  let weekNumber = 4;
  let dayOfWeek;
  if (recurrenceOptions.bymonthday && !recurrenceOptions.bymonthday.length) {
    value = 'onDayNumber';
    dayNumberTextField = recurrenceOptions.bymonthday;
    weekNumber = stateWeekNumber;
    dayOfWeek = stateDayOfWeek;
  } else {
    value = 'onDayOfWeek';
    if (!recurrenceOptions.byweekday) {
      dayOfWeek = stateDayOfWeek;
      weekNumber = stateWeekNumber;
    } else {
      dayOfWeek = recurrenceOptions.byweekday < 6
        ? Number.parseInt(recurrenceOptions.byweekday, 10) + 1 : 0;
      if (recurrenceOptions.bymonthday && recurrenceOptions.bymonthday[0] > 0) {
        weekNumber = Math.trunc(recurrenceOptions.bymonthday[0] / 7);
      }
    }
  }

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'onDayNumber':
        setStateWeekNumber(weekNumber);
        setStateDayOfWeek(dayOfWeek);
        onRecurrenceOptionsChange({
          ...recurrenceOptions,
          bymonthday: dayNumber,
          byweekday: undefined,
        });
        break;
      case 'onDayOfWeek':
        setDayNumber(recurrenceOptions.bymonthday || dayNumber);
        handleToDayOfWeekChange(
          stateWeekNumber,
          stateDayOfWeek,
          onRecurrenceOptionsChange,
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
        className={classes.formControl}
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
                onRecurrenceOptionsChange,
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
            <Switcher
              disabled={value !== 'onDayOfWeek'}
              onChange={newWeekNumber => handleWeekNumberChange(
                newWeekNumber,
                onRecurrenceOptionsChange,
                recurrenceOptions,
              )}
              value={weekNumber}
              availableOptions={getNumberLabels(getMessage)}
              className={classes.switcher}
            />
            <Switcher
              disabled={value !== 'onDayOfWeek'}
              onChange={newWeekDay => onRecurrenceOptionsChange({
                ...recurrenceOptions, byweekday: newWeekDay > 0 ? newWeekDay - 1 : 6,
              })}
              value={dayOfWeek}
              availableOptions={getDaysOfWeek(formatDate)}
              className={classes.longSwitcher}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};


MonthlyEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  onExecute: PropTypes.func,
  getMessage: PropTypes.func,
  onRecurrenceOptionsChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
};

MonthlyEditorBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  onExecute: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};

export const MonthlyEditor = withStyles(styles)(MonthlyEditorBase, { name: 'MonthlyEditor' });
