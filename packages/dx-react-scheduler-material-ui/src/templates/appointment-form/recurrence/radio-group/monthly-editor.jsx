import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { NUMBER_EDITOR } from '@devexpress/dx-scheduler-core';
import {
  getNumberLabels,
  getDaysOfWeek,
} from '../../../utils';

const styles = ({ spacing }) => ({
  textEditor: {
    width: '5em',
    marginLeft: spacing(2),
    marginRight: spacing(2),
  },
  label: {
    paddingTop: spacing(5),
  },
  input: {
    paddingBottom: spacing(2.75),
  },
});

const handleStartDateChange = (
  newStartDay,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (newStartDay <= 31) {
    const newOptions = { ...options, bymonthday: newStartDay };
    changeRecurrenceOptionsAction(newOptions);
  }
};

const handleToDayOfWeekChange = (
  weekNumber,
  dayOfweek,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (weekNumber < 4) {
    const newOptions = {
      ...options,
      bymonthday: [
        weekNumber * 7 + 1,
        weekNumber * 7 + 2,
        weekNumber * 7 + 3,
        weekNumber * 7 + 4,
        weekNumber * 7 + 5,
        weekNumber * 7 + 6,
        weekNumber * 7 + 7,
      ],
      byweekday: dayOfweek,
    };
    changeRecurrenceOptionsAction(newOptions);
  } else {
    const newOptions = {
      ...options,
      bymonthday: [-1, -2, -3, -4, -5, -6, -7],
      byweekday: dayOfweek,
    };
    changeRecurrenceOptionsAction(newOptions);
  }
};

const handleWeekNumberChange = (
  newWeekNumber,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (newWeekNumber < 4) {
    const newOptions = {
      ...options,
      bymonthday: [
        newWeekNumber * 7 + 1,
        newWeekNumber * 7 + 2,
        newWeekNumber * 7 + 3,
        newWeekNumber * 7 + 4,
        newWeekNumber * 7 + 5,
        newWeekNumber * 7 + 6,
        newWeekNumber * 7 + 7,
      ],
    };
    changeRecurrenceOptionsAction(newOptions);
  } else {
    const newOptions = {
      ...options,
      bymonthday: [-1, -2, -3, -4, -5, -6, -7],
    };
    changeRecurrenceOptionsAction(newOptions);
  }
};

const MonthlyEditorBase = ({
  classes,
  className,
  onExecute,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  recurrenceOptions,
  onRecurrenceOptionsChange,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  switcherComponent: Switcher,
  readOnly,
  changedAppointment,
  ...restProps
}) => {
  const [dayNumber, setDayNumber] = useState(changedAppointment.startDate.getDate());
  const [stateWeekNumber, setStateWeekNumber] = useState(
    Math.trunc((changedAppointment.startDate.getDate() - 1) / 7),
  );
  const [stateDayOfWeek, setStateDayOfWeek] = useState(changedAppointment.startDate.getDay());

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
      dayOfWeek = recurrenceOptions.byweekday;
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
      className={classNames(classes.group, className)}
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
              onValueChange={dayNumber => handleStartDateChange(
                dayNumber,
                onRecurrenceOptionsChange,
                recurrenceOptions,
              )}
            />
            <Label
              label={getMessage('ofEveryMonthLabel')}
              className={classes.label}
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
          >
            <Label
              className={classes.label}
              label={getMessage('theLabel')}
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
            />
            <Switcher
              disabled={value !== 'onDayOfWeek'}
              onChange={newWeekDay => onRecurrenceOptionsChange({
                ...recurrenceOptions, byweekday: newWeekDay,
              })}
              value={dayOfWeek}
              availableOptions={getDaysOfWeek(getMessage)}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};


MonthlyEditorBase.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func,
  getMessage: PropTypes.func,
  onRecurrenceOptionsChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
  changedAppointment: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
};

MonthlyEditorBase.defaultProps = {
  className: undefined,
  onRecurrenceOptionsChange: () => undefined,
  onExecute: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};

export const MonthlyEditor = withStyles(styles)(MonthlyEditorBase, { name: 'MonthlyEditor' });
