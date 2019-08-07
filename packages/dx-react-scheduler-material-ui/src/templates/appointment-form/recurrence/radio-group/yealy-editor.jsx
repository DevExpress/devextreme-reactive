import * as React from 'react';
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
  getMonths,
} from '../../../utils';

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
  startDate,
  changeRecurrenceOptionsAction,
  options,
) => {
  const weekNumber = Math.trunc((startDate.getDate() - 1) / 7);
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
      byweekday: startDate.getDay(),
    };
    changeRecurrenceOptionsAction(newOptions);
  } else {
    const newOptions = {
      ...options,
      bymonthday: [-1, -2, -3, -4, -5, -6, -7],
      byweekday: startDate.getDay(),
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

const YearlyEditorBase = ({
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
  let dayOfWeek = changedAppointment.startDate.getDay();
  if (recurrenceOptions.byweekday) {
    dayOfWeek = recurrenceOptions.byweekday;
  }
  // The last week in a month
  let weekNumber = 4;
  let dayNumberTextField = changedAppointment.startDate.getDate();
  let value;
  if (recurrenceOptions.bymonthday && !recurrenceOptions.bymonthday.length) {
    value = 'onDayAndMonth';
    dayNumberTextField = recurrenceOptions.bymonthday;
    weekNumber = Math.trunc((changedAppointment.startDate.getDate() - 1) / 7);
  } else {
    value = 'onDayOfWeek';
    if (recurrenceOptions.bymonthday && recurrenceOptions.bymonthday[0] > 0) {
      weekNumber = Math.trunc(recurrenceOptions.bymonthday[0] / 7);
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
        onRecurrenceOptionsChange({
          ...recurrenceOptions,
          bymonthday: changedAppointment.startDate.getDate(),
          byweekday: undefined,
        })
        break;
      case 'onDayOfWeek':
        handleToDayOfWeekChange(
          changedAppointment.startDate,
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
              onValueChange={dayNumber => handleStartDateChange(
                dayNumber,
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
                byweekday: newWeekDay,
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
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func,
  getMessage: PropTypes.func,
  onRecurrenceOptionsChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
};

YearlyEditorBase.defaultProps = {
  className: undefined,
  onRecurrenceOptionsChange: () => undefined,
  onExecute: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};

export const YearlyEditor = withStyles(styles)(YearlyEditorBase, { name: 'YearlyEditor' });
