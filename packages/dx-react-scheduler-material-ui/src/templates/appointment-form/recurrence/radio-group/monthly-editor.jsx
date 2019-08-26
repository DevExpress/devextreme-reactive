import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import {
  NUMBER_EDITOR,
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getRecurrenceOptions,
  changeRecurrenceOptions,
  handleStartDateChange,
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
  appointmentData,
  formatDate,
  onFieldChange,
  ...restProps
}) => {
  const [dayNumber, setDayNumber] = useState(appointmentData.startDate.getDate());
  const [stateWeekNumber, setStateWeekNumber] = useState(
    Math.trunc((appointmentData.startDate.getDate() - 1) / 7),
  );
  const [stateDayOfWeek, setStateDayOfWeek] = useState(appointmentData.startDate.getDay());

  const { rRule } = appointmentData;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule), [rRule]);
  const changeByMonthDay = React.useCallback(nextByMonthDay => onFieldChange({
    rRule: handleStartDateChange(nextByMonthDay, recurrenceOptions),
  }), [recurrenceOptions]);

  const {
    dayOfWeek, weekNumber, dayNumberTextField, radioGroupValue: value,
  } = getDisplayDataFromOptionsAndState(
    recurrenceOptions, stateDayOfWeek, stateWeekNumber, dayNumber,
  );

  const changeWeekNumber = React.useCallback(newWeekNumber => onFieldChange({
    rRule: handleWeekNumberChange(newWeekNumber, recurrenceOptions),
  }), [recurrenceOptions]);
  const weekNumbers = React.useMemo(
    () => getNumberLabels(getMessage), [getMessage],
  );

  const changeDayOfWeek = React.useCallback(newWeekDay => onFieldChange({
    rRule: changeRecurrenceOptions({
      ...recurrenceOptions, byweekday: newWeekDay > 0 ? newWeekDay - 1 : 6,
    }),
  }), [recurrenceOptions]);
  const daysOfWeek = React.useMemo(
    () => getDaysOfWeek(formatDate), [formatDate],
  );

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'onDayNumber':
        setStateWeekNumber(weekNumber);
        setStateDayOfWeek(dayOfWeek);
        onFieldChange({
          rRule: changeRecurrenceOptions({
            ...recurrenceOptions, bymonthday: dayNumber, byweekday: undefined,
          }),
        });
        break;
      case 'onDayOfWeek':
        setDayNumber(recurrenceOptions.bymonthday || dayNumber);
        onFieldChange({
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
              readOnly={readOnly || value !== 'onDayNumber'}
              value={dayNumberTextField}
              className={classes.textEditor}
              id={NUMBER_EDITOR}
              onValueChange={changeByMonthDay}
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
              onChange={changeWeekNumber}
              value={weekNumber}
              availableOptions={weekNumbers}
              className={classes.select}
            />
            <Select
              disabled={value !== 'onDayOfWeek'}
              onChange={changeDayOfWeek}
              value={dayOfWeek}
              availableOptions={daysOfWeek}
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
  onFieldChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  appointmentData: PropTypes.shape({
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
  onFieldChange: () => undefined,
  readOnly: false,
};

export const MonthlyEditor = withStyles(styles)(MonthlyEditorBase, { name: 'MonthlyEditor' });
