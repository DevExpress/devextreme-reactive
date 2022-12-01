import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@mui/material/RadioGroup';
import {
  handleToDayOfWeekChange,
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

const getCurrentMonth = (recurrenceOptions, appointmentData) => {
  if (recurrenceOptions.bymonth) {
    return recurrenceOptions.bymonth;
  }
  return appointmentData.startDate.getMonth() + 1;
};

export const YearlyEditor = ({
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  selectComponent: Select,
  readOnly,
  appointmentData,
  formatDate,
  onFieldChange,
  firstDayOfWeek,
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
    rRule: handleToDayOfWeekChange(nextWeekNumber, dayOfWeek, recurrenceOptions),
  }), [recurrenceOptions, dayOfWeek]);
  const weekNumbers = React.useMemo(
    () => getWeekNumberLabels(getMessage), [getMessage],
  );

  const changeDayOfWeek = React.useCallback(nextDayOfWeek => onFieldChange({
    rRule: handleToDayOfWeekChange(weekNumber, nextDayOfWeek, recurrenceOptions),
  }), [recurrenceOptions, weekNumber]);
  const daysOfWeek = React.useMemo(
    () => getDaysOfWeek(formatDate, firstDayOfWeek), [formatDate, firstDayOfWeek],
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
        readOnly={readOnly}
        readOnlyEditors={onDayAndMonthReadOnly}
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
        readOnly={readOnly}
        readOnlyEditors={onDayOfWeekReadOnly}
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

YearlyEditor.propTypes = {
  getMessage: PropTypes.func,
  onFieldChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  firstDayOfWeek: PropTypes.number.isRequired,
};

YearlyEditor.defaultProps = {
  onFieldChange: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};
