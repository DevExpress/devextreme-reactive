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
    width: 'calc((100% - 5.5em) * 3 / 7)',
    maxWidth: '7.25em',
    marginRight: '1em',
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
  label: {
    width: '4.5em',
  },
  longLabel: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 11.5em)',
  },
  grid: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  formControl: {
    marginRight: 0,
  },
  controlLabel: {
    width: '100%',
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
                onAppointmentFieldChange,
                recurrenceOptions,
              )}
            />
            <Label
              label={getMessage('ofEveryMonthLabel')}
              className={classes.longLabel}
            />
          </Grid>
        )}
      />
      <FormControlLabel
        value="onDayOfWeek"
        className={classes.formControl}
        classes={{ label: classes.controlLabel }}
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
  changedAppointment: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  readOnly: PropTypes.bool,
  formatDate: PropTypes.func.isRequired,
};

MonthlyEditorBase.defaultProps = {
  getMessage: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const MonthlyEditor = withStyles(styles)(MonthlyEditorBase, { name: 'MonthlyEditor' });
