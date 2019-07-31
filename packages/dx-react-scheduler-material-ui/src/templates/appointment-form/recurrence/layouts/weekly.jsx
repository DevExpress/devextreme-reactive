import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { DAYS_OF_WEEK } from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  label: {
    width: '8em',
    paddingTop: theme.spacing(5),
  },
  textEditor: {
    width: '4em',
  },
});

const handleIntervalChange = (options, newInterval, action) => {
  const newOptions = { ...options, interval: newInterval };
  action(newOptions);
};

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
  console.log(newOptions);
  action(newOptions);
};

const LayoutBase = ({
  textEditorComponent: TextEditor,
  labelComponent: Label,
  booleanEditorComponent: BooleanEditor,
  onRecurrenceOptionsChange,
  changeAppointment,
  className,
  classes,
  getMessage,
  readOnly,
  recurrenceOptions,
  ...restProps
}) => {console.log(recurrenceOptions.byweekday); return (
  <div
    className={classNames(classes.root, className)}
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
        {...changeAppointment && {
          onValueChange: value => handleIntervalChange(
            recurrenceOptions, value, onRecurrenceOptionsChange,
          ),
        }}
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
        label={getMessage('sundayLabel')}
        readOnly={readOnly}
        value={recurrenceOptions.byweekday && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SUNDAY) > -1}
        onValueChange={checked => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.SUNDAY,
          onRecurrenceOptionsChange,
          checked,
        )}
      />
      <BooleanEditor
        label={getMessage('mondayLabel')}
        readOnly={readOnly}
        value={recurrenceOptions.byweekday && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.MONDAY) > -1}
        onValueChange={checked => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.MONDAY,
          onRecurrenceOptionsChange,
          checked,
        )}
      />
      <BooleanEditor
        label={getMessage('tuesdayLabel')}
        readOnly={readOnly}
        value={recurrenceOptions.byweekday && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.TUESDAY) > -1}
        onValueChange={checked => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.TUESDAY,
          onRecurrenceOptionsChange,
          checked,
        )}
      />
      <BooleanEditor
        label={getMessage('wednesdayLabel')}
        readOnly={readOnly}
        value={recurrenceOptions.byweekday && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.WEDNESDAY) > -1}
        onValueChange={checked => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.WEDNESDAY,
          onRecurrenceOptionsChange,
          checked,
        )}
      />
      <BooleanEditor
        label={getMessage('thursdayLabel')}
        readOnly={readOnly}
        value={recurrenceOptions.byweekday && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.THURSDAY) > -1}
        onValueChange={checked => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.THURSDAY,
          onRecurrenceOptionsChange,
          checked,
        )}
      />
      <BooleanEditor
        label={getMessage('fridayLabel')}
        readOnly={readOnly}
        value={recurrenceOptions.byweekday && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.FRIDAY) > -1}
        onValueChange={checked => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.FRIDAY,
          onRecurrenceOptionsChange,
          checked,
        )}
      />
      <BooleanEditor
        label={getMessage('saturdayLabel')}
        readOnly={readOnly}
        value={recurrenceOptions.byweekday && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SATURDAY) > -1}
        onValueChange={checked => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.SATURDAY,
          onRecurrenceOptionsChange,
          checked,
        )}
      />
    </Grid>
  </div>
);};

LayoutBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  booleanEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
