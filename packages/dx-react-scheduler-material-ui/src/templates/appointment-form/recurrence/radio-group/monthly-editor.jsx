import React, { useState } from 'react';
import {
  styled, RadioGroup, FormControlLabel, Radio, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  NUMBER_EDITOR,
  handleToDayOfWeekChange,
  getRecurrenceOptions,
  changeRecurrenceOptions,
  handleStartDateChange,
  getRadioGroupDisplayData,
  getWeekNumberLabels,
  getDaysOfWeek,
} from '@devexpress/dx-scheduler-core';

const PREFIX = 'MonthlyEditor';

export const classes = {
  textEditor: `${PREFIX}-textEditor`,
  input: `${PREFIX}-input`,
  select: `${PREFIX}-select`,
  longSelect: `${PREFIX}-longSelect`,
  label: `${PREFIX}-label`,
  longLabel: `${PREFIX}-longLabel`,
  grid: `${PREFIX}-grid`,
  formControl: `${PREFIX}-formControl`,
  controlLabel: `${PREFIX}-controlLabel`,
};

const StyledRadioGroup = styled(RadioGroup)(({ theme: { spacing } }) => ({
  [`& .${classes.textEditor}`]: {
    width: 'calc((100% - 5.5em) * 3 / 7)',
    maxWidth: '12em',
    marginRight: '1em',
  },
  [`& .${classes.input}`]: {
    paddingBottom: spacing(2.75),
  },
  [`& .${classes.select}`]: {
    width: 'calc((100% - 5.5em) * 3 / 7)',
    maxWidth: '8em',
  },
  [`& .${classes.longSelect}`]: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 13.5em)',
    marginLeft: '1em',
  },
  [`& .${classes.label}`]: {
    width: '4.5em',
  },
  [`& .${classes.longLabel}`]: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 14em)',
  },
  [`& .${classes.grid}`]: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  [`& .${classes.formControl}`]: {
    marginRight: 0,
  },
  [`& .${classes.controlLabel}`]: {
    width: '100%',
  },
}));

export const MonthlyEditor = ({
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
    recurrenceOptions, stateDayOfWeek, stateWeekNumber, dayNumber, 'onDayNumber', 'onDayOfWeek',
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

  const onDayNumberReadOnly = readOnly || value !== 'onDayNumber';
  const onDayOfWeekReadOnly = readOnly || value !== 'onDayOfWeek';

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
    <StyledRadioGroup
      onChange={onRadioGroupValueChange}
      value={value}
      {...restProps}
    >
      <FormControlLabel
        className={classes.formControl}
        value="onDayNumber"
        control={<Radio color="primary" />}
        disabled={readOnly}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.grid}
          >
            <Label
              text={getMessage('onLabel')}
              className={classes.label}
            />
            <TextEditor
              readOnly={onDayNumberReadOnly}
              value={dayNumberTextField}
              className={classes.textEditor}
              type={NUMBER_EDITOR}
              onValueChange={changeByMonthDay}
            />
            <Label
              text={getMessage('ofEveryMonthLabel')}
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
        disabled={readOnly}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.grid}
          >
            <Label
              text={getMessage('theLabel')}
              className={classes.label}
            />
            <Select
              readOnly={onDayOfWeekReadOnly}
              onValueChange={changeWeekNumber}
              value={weekNumber}
              availableOptions={weekNumbers}
              className={classes.select}
            />
            <Select
              readOnly={onDayOfWeekReadOnly}
              onValueChange={changeDayOfWeek}
              value={dayOfWeek}
              availableOptions={daysOfWeek}
              className={classes.longSelect}
            />
          </Grid>
        )}
      />
    </StyledRadioGroup>
  );
};

MonthlyEditor.propTypes = {
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
  readOnly: PropTypes.bool,
  formatDate: PropTypes.func.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
};

MonthlyEditor.defaultProps = {
  getMessage: () => undefined,
  onFieldChange: () => undefined,
  readOnly: false,
};
