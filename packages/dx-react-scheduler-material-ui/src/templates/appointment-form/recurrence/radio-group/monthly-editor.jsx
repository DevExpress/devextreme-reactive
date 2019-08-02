import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';

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
  const newOptions = { ...options, bymonthday: newStartDay };
  changeRecurrenceOptionsAction(newOptions);
};

const handleToDayNumberChange = (
  startDay,
  changeRecurrenceOptionsAction,
  options,
) => {
  const newOptions = { ...options, bymonthday: startDay, byweekday: undefined };
  changeRecurrenceOptionsAction(newOptions);
};

const handleToDayOfWeekChange = (
  startDate,
  changeRecurrenceOptionsAction,
  options,
) => {
  const weekNumber = Math.trunc((startDate.getDate() - 1) / 4);
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

const handleWeekDayChange = (
  newWeekDay,
  changeRecurrenceOptionsAction,
  options,
) => {
  const newOptions = {
    ...options,
    byweekday: newWeekDay,
  };
  changeRecurrenceOptionsAction(newOptions);
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
  changeAppointment,
  ...restProps
}) => {
  console.log(recurrenceOptions);
  let value;
  let dayNumberTextField = changedAppointment.startDate.getDate();
  // The last week in a month
  let weekNumber = 4;
  if (recurrenceOptions.bymonthday && !recurrenceOptions.bymonthday.length) {
    value = 'onDayNumber';
    dayNumberTextField = recurrenceOptions.bymonthday;
    weekNumber = Math.trunc(changedAppointment.startDate.getDate() / 7);
  } else {
    value = 'onDayOfWeek';
    if (recurrenceOptions.bymonthday[0] > 0) {
      weekNumber = Math.trunc(recurrenceOptions.bymonthday[0] / 7);
    }
  }

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'onDayNumber':
        handleToDayNumberChange(
          changedAppointment.startDate.getDate(),
          onRecurrenceOptionsChange, recurrenceOptions,
        );
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
      aria-label="gender"
      name="gender1"
      className={classNames(classes.group, className)}
      value={value}
      {...restProps}
    >
      <FormControlLabel
        value="onDayNumber"
        control={<Radio />}
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
              {...changeAppointment && {
                onValueChange: dayNumber => handleStartDateChange(
                  dayNumber,
                  onRecurrenceOptionsChange,
                  recurrenceOptions,
                ),
              }}
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
        control={<Radio />}
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
              availableOptions={[
                {
                  text: getMessage('firstLabel'),
                  id: 0,
                },
                {
                  text: getMessage('secondLabel'),
                  id: 1,
                },
                {
                  text: getMessage('thirdLabel'),
                  id: 2,
                },
                {
                  text: getMessage('fourthLabel'),
                  id: 3,
                },
                {
                  text: getMessage('lastLabel'),
                  id: 4,
                },
              ]}
            />
            <Switcher
              disabled={value !== 'onDayOfWeek'}
              onChange={newWeekDay => handleWeekDayChange(
                newWeekDay,
                onRecurrenceOptionsChange,
                recurrenceOptions,
              )}
              value={value === 'onDayOfWeek' ? recurrenceOptions.byweekday : changedAppointment.startDate.getDay()}
              availableOptions={[
                {
                  text: getMessage('sundayLabel'),
                  id: 0,
                },
                {
                  text: getMessage('mondayLabel'),
                  id: 1,
                },
                {
                  text: getMessage('tuesdayLabel'),
                  id: 2,
                },
                {
                  text: getMessage('wednesdayLabel'),
                  id: 3,
                },
                {
                  text: getMessage('thursdayLabel'),
                  id: 4,
                },
                {
                  text: getMessage('fridayLabel'),
                  id: 5,
                },
                {
                  text: getMessage('saturdayLabel'),
                  id: 6,
                },
              ]}

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
  onExecute: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

MonthlyEditorBase.defaultProps = {
  className: undefined,
};

export const MonthlyEditor = withStyles(styles)(MonthlyEditorBase, { name: 'MonthlyEditor' });
