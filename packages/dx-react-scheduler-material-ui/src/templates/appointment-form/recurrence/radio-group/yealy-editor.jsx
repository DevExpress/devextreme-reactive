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
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getRecurrenceOptions,
  changeRecurrenceOptions,
  handleStartDateChange,
  getRadioGroupDisplayData,
  getWeekNumberLabels,
  getDaysOfWeek,
  getMonths,
  getMonthsWithOf,
} from '@devexpress/dx-scheduler-core';
import { ChangeMonthEditor } from './change-month-editor';
import { ChangeWeekNumberEditor } from './change-week-number-editor';

const styles = ({ spacing }) => ({
  textEditor: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 13.5em)',
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
    maxWidth: '8em',
  },
  longSelect: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 13.5em)',
    marginLeft: '1em',
  },
  formControlLabel: {
    alignItems: 'flex-start',
  },
  formControl: {
    marginRight: 0,
    marginTop: spacing(1),
    marginBottom: spacing(1),
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

const getCurrentMonth = (recurrenceOptions, appointmentData) => {
  if (recurrenceOptions.bymonth) {
    return recurrenceOptions.bymonth;
  }
  return appointmentData.startDate.getMonth() + 1;
};

const YearlyEditorBase = ({
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
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule) || {}, [rRule]);
  const changeByMonthDay = React.useCallback(nextByMonthDay => onFieldChange({
    rRule: handleStartDateChange(nextByMonthDay, recurrenceOptions),
  }), [recurrenceOptions]);

  const {
    dayOfWeek, weekNumber, dayNumberTextField, radioGroupValue: value,
  } = getRadioGroupDisplayData(
    recurrenceOptions, stateDayOfWeek, stateWeekNumber, dayNumber, 'onDayAndMonth', 'onDayOfWeek',
  );
  const month = getCurrentMonth(recurrenceOptions, appointmentData);

  const changeMonth = React.useCallback(nextMonth => onFieldChange({
    rRule: changeRecurrenceOptions({
      ...recurrenceOptions, bymonth: nextMonth,
    }),
  }), [recurrenceOptions]);
  const months = React.useMemo(() => getMonths(formatDate), [formatDate]);
  const monthsWithOf = React.useMemo(
    () => getMonthsWithOf(getMessage, formatDate), [getMessage, formatDate],
  );

  const changeWeekNumber = React.useCallback(nextWeekNumber => onFieldChange({
    rRule: handleWeekNumberChange(nextWeekNumber, recurrenceOptions),
  }), [recurrenceOptions]);
  const weekNumbers = React.useMemo(
    () => getWeekNumberLabels(getMessage), [getMessage],
  );

  const changeDayOfWeek = React.useCallback(nextDayOfWeek => onFieldChange({
    rRule: changeRecurrenceOptions({
      ...recurrenceOptions, byweekday: nextDayOfWeek > 0 ? nextDayOfWeek - 1 : 6,
    }),
  }), [recurrenceOptions]);
  const daysOfWeek = React.useMemo(
    () => getDaysOfWeek(formatDate), [formatDate],
  );

  const onDayAndMonthReadOnly = readOnly || value !== 'onDayAndMonth';
  const onDayOfWeekReadOnly = readOnly || value !== 'onDayOfWeek';

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'onDayAndMonth':
        setStateWeekNumber(weekNumber);
        setStateDayOfWeek(dayOfWeek);
        onFieldChange({
          rRule: changeRecurrenceOptions({
            ...recurrenceOptions,
            bymonthday: dayNumber,
            byweekday: undefined,
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
      <ChangeMonthEditor
        getMessage={getMessage}
        labelComponent={Label}
        textEditorComponent={TextEditor}
        selectComponent={Select}
        readOnly={onDayAndMonthReadOnly}
        month={month}
        changeMonth={changeMonth}
        months={months}
        dayNumber={dayNumberTextField}
        changeByMonthDay={changeByMonthDay}
      />
      <ChangeWeekNumberEditor
        getMessage={getMessage}
        labelComponent={Label}
        selectComponent={Select}
        readOnly={onDayOfWeekReadOnly}
        month={month}
        changeMonth={changeMonth}
        months={monthsWithOf}
        weekNumber={weekNumber}
        weekNumbers={weekNumbers}
        changeWeekNumber={changeWeekNumber}
        dayOfWeek={dayOfWeek}
        daysOfWeek={daysOfWeek}
        changeDayOfWeek={changeDayOfWeek}
      />
    </RadioGroup>
  );
};

YearlyEditorBase.propTypes = {
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
  formatDate: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

YearlyEditorBase.defaultProps = {
  onFieldChange: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};

export const YearlyEditor = withStyles(styles)(YearlyEditorBase, { name: 'YearlyEditor' });
