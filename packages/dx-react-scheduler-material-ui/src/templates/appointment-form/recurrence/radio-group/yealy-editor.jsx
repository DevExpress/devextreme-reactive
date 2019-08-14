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
} from '@devexpress/dx-scheduler-core';
import {
  getNumberLabels,
  getDaysOfWeek,
  getMonths,
  getMonthsWithOf,
} from './helpers';

const styles = ({ spacing }) => ({
  textEditor: {
    width: '8em',
    marginLeft: spacing(2),
    marginRight: spacing(2),
    marginTop: spacing(1.5),
  },
  shortLabel: {
    paddingTop: spacing(4),
    width: '8%',
  },
  label: {
    width: '4em',
    marginRight: 0,
  },
  input: {
    paddingBottom: spacing(2.75),
  },
  switcher: {
    width: '6em',
    marginLeft: spacing(1.75),
    marginTop: spacing(1.5),
    marginBottom: spacing(1),
  },
  longSwitcher: {
    width: '8em',
    marginLeft: spacing(1.75),
  },
  formControlLabel: {
    alignItems: 'flex-start',
  },
  doubleSwitcher: {
    marginLeft: spacing(9.25),
    width: '15em',
    marginTop: spacing(1),
  },
  radioButton: {
    marginTop: spacing(0.75),
  },
});

const YearlyEditorBase = ({
  classes,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
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

  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
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
            alignItems="center"
          >
            <Label
              label={getMessage('everyLabel')}
              className={classes.label}
            />
            <Switcher
              disabled={value !== 'onDayAndMonth'}
              onChange={newMonth => onRecurrenceOptionsChange({
                ...recurrenceOptions, bymonth: newMonth,
              })}
              value={month}
              availableOptions={getMonths(getMessage)}
              className={classes.switcher}
            />
            <TextEditor
              className={classes.textEditor}
              disabled={value !== 'onDayAndMonth'}
              readOnly={readOnly}
              value={dayNumberTextField}
              id={NUMBER_EDITOR}
              onValueChange={newDayNumber => handleStartDateChange(
                newDayNumber,
                onRecurrenceOptionsChange,
                recurrenceOptions,
              )}
              inputProps={{
                style: { paddingBottom: '13px' },
              }}
            />
          </Grid>
        )}
      />
      <FormControlLabel
        value="onDayOfWeek"
        className={classes.formControlLabel}
        control={<Radio color="primary" className={classes.radioButton} />}
        label={(
          <div>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Label
                className={classes.label}
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
                className={classes.longSwitcher}
                disabled={value !== 'onDayOfWeek'}
                onChange={newWeekDay => onRecurrenceOptionsChange({
                  ...recurrenceOptions,
                  byweekday: newWeekDay > 0 ? newWeekDay - 1 : 6,
                })}
                value={dayOfWeek}
                availableOptions={getDaysOfWeek(getMessage)}

              />
            </Grid>
            <Switcher
              className={classes.doubleSwitcher}
              disabled={value !== 'onDayOfWeek'}
              onChange={newMonth => onRecurrenceOptionsChange({
                ...recurrenceOptions, bymonth: newMonth,
              })}
              value={month}
              availableOptions={getMonthsWithOf(getMessage)}
            />
          </div>
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
