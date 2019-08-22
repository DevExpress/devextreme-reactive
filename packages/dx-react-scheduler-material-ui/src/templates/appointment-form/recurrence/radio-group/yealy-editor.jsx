import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames';
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
import {
  getNumberLabels,
  getDaysOfWeek,
  getMonths,
  getMonthsWithOf,
} from '../../helpers';

const styles = ({ spacing }) => ({
  textEditor: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 11.5em)',
    marginTop: spacing(1),
    marginBottom: spacing(1),
    marginLeft: '1em',
  },
  label: {
    width: '4.5em',
  },
  input: {
    paddingBottom: spacing(2.75),
  },
  select: {
    width: 'calc((100% - 5.5em) * 3 / 7)',
    maxWidth: '6em',
  },
  longSelect: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 11.5em)',
    marginLeft: '1em',
  },
  formControlLabel: {
    alignItems: 'flex-start',
  },
  formControl: {
    marginRight: 0,
  },
  doubleSelect: {
    marginLeft: '4.5em',
    width: 'calc(100% - 4.5em)',
    marginTop: spacing(1),
  },
  radioButton: {
    marginTop: spacing(0.75),
  },
  controlLabel: {
    width: '100%',
  },
});

const getCurrentMonth = (recurrenceOptions, changedAppointment) => {
  if (recurrenceOptions.bymonth) {
    return recurrenceOptions.bymonth;
  }
  return changedAppointment.startDate.getMonth() + 1;
};

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
    data.radioGroupValue = 'onDayAndMonth';
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

const YearlyEditorBase = ({
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
  const month = getCurrentMonth(recurrenceOptions, changedAppointment);

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'onDayAndMonth':
        setStateWeekNumber(weekNumber);
        setStateDayOfWeek(dayOfWeek);
        onAppointmentFieldChange({
          rRule: changeRecurrenceOptions({
            ...recurrenceOptions,
            bymonthday: dayNumber,
            byweekday: undefined,
          }),
        });
        break;
      case 'onDayOfWeek':
        setDayNumber(recurrenceOptions.bymonthday || dayNumber);
        onAppointmentFieldChange({
          rRule: handleToDayOfWeekChange(
            stateWeekNumber,
            stateDayOfWeek,
            recurrenceOptions,
          ),
        });
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
        className={classes.formControl}
        classes={{ label: classes.controlLabel }}
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
            <Select
              disabled={value !== 'onDayAndMonth'}
              onChange={newMonth => onAppointmentFieldChange({
                rRule: changeRecurrenceOptions({
                  ...recurrenceOptions, bymonth: newMonth,
                }),
              })}
              value={month}
              availableOptions={getMonths(formatDate)}
              className={classes.select}
            />
            <TextEditor
              className={classes.textEditor}
              disabled={value !== 'onDayAndMonth'}
              readOnly={readOnly}
              value={dayNumberTextField}
              id={NUMBER_EDITOR}
              onValueChange={newDayNumber => onAppointmentFieldChange({
                rRule: handleStartDateChange(
                  newDayNumber,
                  recurrenceOptions,
                ),
              })}
            />
          </Grid>
        )}
      />
      <FormControlLabel
        value="onDayOfWeek"
        className={classNames(classes.formControlLabel, classes.formControl)}
        classes={{ label: classes.controlLabel }}
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
              <Select
                className={classes.select}
                disabled={value !== 'onDayOfWeek'}
                onChange={newWeekNumber => onAppointmentFieldChange({
                  rRule: handleWeekNumberChange(
                    newWeekNumber,
                    recurrenceOptions,
                  ),
                })}
                value={weekNumber}
                availableOptions={getNumberLabels(getMessage)}
              />
              <Select
                className={classes.longSelect}
                disabled={value !== 'onDayOfWeek'}
                onChange={newWeekDay => onAppointmentFieldChange({
                  rRule: changeRecurrenceOptions({
                    ...recurrenceOptions,
                    byweekday: newWeekDay > 0 ? newWeekDay - 1 : 6,
                  }),
                })}
                value={dayOfWeek}
                availableOptions={getDaysOfWeek(formatDate)}
              />
            </Grid>
            <Select
              className={classes.doubleSelect}
              disabled={value !== 'onDayOfWeek'}
              onChange={newMonth => onAppointmentFieldChange({
                rRule: changeRecurrenceOptions({
                  ...recurrenceOptions, bymonth: newMonth,
                }),
              })}
              value={month}
              availableOptions={getMonthsWithOf(getMessage, formatDate)}
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
  onAppointmentFieldChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

YearlyEditorBase.defaultProps = {
  onAppointmentFieldChange: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};

export const YearlyEditor = withStyles(styles)(YearlyEditorBase, { name: 'YearlyEditor' });
