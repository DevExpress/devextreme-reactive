import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { NUMBER_EDITOR } from '@devexpress/dx-scheduler-core';
import {
  handleStartDateChange,
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getNumberLabels,
  getDaysOfWeek,
  getMonths,
} from './helpers';

const styles = ({ spacing }) => ({
  textEditor: {
    width: '5em',
    marginLeft: spacing(2),
    marginRight: spacing(2),
  },
  shortLabel: {
    paddingTop: spacing(4),
    width: '8%',
  },
  label: {
    paddingTop: spacing(4),
    width: '6.5em',
    marginRight: 0,
  },
  input: {
    paddingBottom: spacing(2.75),
  },
  switcher: {
    width: '40%',
    marginLeft: spacing(1),
    marginRight: spacing(1),
  },
  numberEditor: {
    width: '15%',
  },
});

const YearlyEditorBase = ({
  classes,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  recurrenceOptions,
  onRecurrenceOptionsChange,
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

  let dayOfWeek;
  // The last week in a month
  let weekNumber = 4;
  let dayNumberTextField = dayNumber;
  let value;
  if (recurrenceOptions.bymonthday && !recurrenceOptions.bymonthday.length) {
    value = 'onDayAndMonth';
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

  let month;
  if (recurrenceOptions.bymonth) {
    month = recurrenceOptions.bymonth;
  } else {
    month = changedAppointment.startDate.getMonth() + 1;
  }

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'onDayAndMonth':
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
        value="onDayAndMonth"
        control={<Radio color="primary" />}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
          >
            <Label
              label={getMessage('repeatEveryLabel')}
              className={classes.label}
            />
            <Switcher
              className={classes.switcher}
              disabled={value !== 'onDayAndMonth'}
              onChange={newMonth => onRecurrenceOptionsChange({
                ...recurrenceOptions, bymonth: newMonth,
              })}
              value={month}
              availableOptions={getMonths(getMessage)}
            />
            <TextEditor
              className={classes.numberEditor}
              disabled={value !== 'onDayAndMonth'}
              readOnly={readOnly}
              value={dayNumberTextField}
              id={NUMBER_EDITOR}
              onValueChange={newDayNumber => handleStartDateChange(
                newDayNumber,
                onRecurrenceOptionsChange,
                recurrenceOptions,
              )}
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
              className={classes.shortLabel}
              label={getMessage('theLabel')}
            />
            <Switcher
              className={classes.switcher}
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
              className={classes.switcher}
              disabled={value !== 'onDayOfWeek'}
              onChange={newWeekDay => onRecurrenceOptionsChange({
                ...recurrenceOptions,
                byweekday: newWeekDay > 0 ? newWeekDay - 1 : 6,
              })}
              value={dayOfWeek}
              availableOptions={getDaysOfWeek(getMessage)}

            />
            <Label
              label={getMessage('ofLabel')}
              className={classes.shortLabel}
            />
            <Switcher
              className={classes.switcher}
              disabled={value !== 'onDayOfWeek'}
              onChange={newMonth => onRecurrenceOptionsChange({
                ...recurrenceOptions, bymonth: newMonth,
              })}
              value={month}
              availableOptions={getMonths(getMessage)}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};


YearlyEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func,
  onRecurrenceOptionsChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
};

YearlyEditorBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};

export const YearlyEditor = withStyles(styles)(YearlyEditorBase, { name: 'YearlyEditor' });
