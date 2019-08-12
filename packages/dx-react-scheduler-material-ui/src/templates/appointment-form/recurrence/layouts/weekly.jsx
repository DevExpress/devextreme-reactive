import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  DAYS_OF_WEEK,
  NUMBER_EDITOR,
  getRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  label: {
    width: '8em',
    paddingTop: theme.spacing(5),
  },
  textEditor: {
    width: '4em',
  },
});

const handleWeekDaysChange = (options, weekDay, action, isAdded) => {
  let byWeekDay = options.byweekday || [];
  if (isAdded) {
    byWeekDay.push(weekDay);
  } else {
    const index = byWeekDay.indexOf(weekDay);
    if (index > -1) {
      byWeekDay.splice(index, 1);
    }
  }
  if (byWeekDay === 0) byWeekDay = undefined;
  const newOptions = { ...options, byweekday: byWeekDay };
  action(newOptions);
};

const WeeklyBase = ({
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  onRecurrenceOptionsChange,
  classes,
  getMessage,
  readOnly,
  onAppointmentFieldChange,
  changedAppointment,
  switcherComponent: Switcher,
  booleanEditorComponent: BooleanEditor,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  return (
    <div
      {...restProps}
    >
      <Grid
        container
        direction="row"
        justify="flex-start"
      >
        <Label
          label={getMessage('repeatEveryLabel')}
          className={classes.label}
        />
        <TextEditor
          readOnly={readOnly}
          value={recurrenceOptions.interval}
          className={classes.textEditor}
          id={NUMBER_EDITOR}
          onValueChange={value => onRecurrenceOptionsChange({
            ...recurrenceOptions, interval: value,
          })}
        />
        <Label
          label={getMessage('weeksOnLabel')}
          className={classes.label}
        />
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
      >
        <BooleanEditor
          label={getMessage('sunLabel')}
          readOnly={readOnly}
          value={recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SUNDAY) > -1}
          onValueChange={checked => handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.SUNDAY,
            onRecurrenceOptionsChange,
            checked,
          )}
        />
        <BooleanEditor
          label={getMessage('monLabel')}
          readOnly={readOnly}
          value={recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.MONDAY) > -1}
          onValueChange={checked => handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.MONDAY,
            onRecurrenceOptionsChange,
            checked,
          )}
        />
        <BooleanEditor
          label={getMessage('tueLabel')}
          readOnly={readOnly}
          value={recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.TUESDAY) > -1}
          onValueChange={checked => handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.TUESDAY,
            onRecurrenceOptionsChange,
            checked,
          )}
        />
        <BooleanEditor
          label={getMessage('wedLabel')}
          readOnly={readOnly}
          value={recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.WEDNESDAY) > -1}
          onValueChange={checked => handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.WEDNESDAY,
            onRecurrenceOptionsChange,
            checked,
          )}
        />
        <BooleanEditor
          label={getMessage('thuLabel')}
          readOnly={readOnly}
          value={recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.THURSDAY) > -1}
          onValueChange={checked => handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.THURSDAY,
            onRecurrenceOptionsChange,
            checked,
          )}
        />
        <BooleanEditor
          label={getMessage('friLabel')}
          readOnly={readOnly}
          value={recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.FRIDAY) > -1}
          onValueChange={checked => handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.FRIDAY,
            onRecurrenceOptionsChange,
            checked,
          )}
        />
        <BooleanEditor
          label={getMessage('satLabel')}
          readOnly={readOnly}
          value={recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SATURDAY) > -1}
          onValueChange={checked => handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.SATURDAY,
            onRecurrenceOptionsChange,
            checked,
          )}
        />
      </Grid>
    </div>
  );
};

WeeklyBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  booleanEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  recurrenceOptions: PropTypes.object.isRequired,
};

WeeklyBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Weekly = withStyles(styles)(WeeklyBase, { name: 'Weekly' });
