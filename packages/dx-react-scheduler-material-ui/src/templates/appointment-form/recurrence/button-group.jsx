import React from 'react';
import Button from '@material-ui/core/Button';
import MUIButtonGroup from '@material-ui/core/ButtonGroup';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  getRecurrenceOptions,
  DAYS_OF_WEEK,
  SUNDAY_DATE,
  WEEK_DAY_OPTIONS,
  MONDAY_DATE,
  TUESDAY_DATE,
  THURSDAY_DATE,
  FRIDAY_DATE,
  SATURDAY_DATE,
  WEDNESDAY_DATE,
} from '@devexpress/dx-scheduler-core';
import { setColor } from '../../utils';

const styles = ({ palette, spacing }) => ({
  selectedButton: {
    backgroundColor: setColor(400, palette.primary),
    '&:hover': {
      backgroundColor: setColor(500, palette.primary),
    },
    border: `1px solid ${setColor(400, palette.primary)}!important`,
    borderLeft: `1px solid ${setColor(50, palette.primary)}!important`,
    '&:first-child': {
      borderLeft: `1px solid ${setColor(400, palette.primary)}!important`,
    },
    color: setColor(50, palette.primary),
  },
  buttonGroup: {
    marginBottom: spacing(2),
  },
});

const handleWeekDaysChange = (options, weekDay, action) => {
  let byWeekDay = options.byweekday || [];
  const index = byWeekDay.indexOf(weekDay);
  const isAdded = !(index > -1);
  if (isAdded) {
    byWeekDay.push(weekDay);
  } else if (index > -1) {
    byWeekDay.splice(index, 1);
  }
  if (byWeekDay === 0) byWeekDay = undefined;
  const newOptions = { ...options, byweekday: byWeekDay };
  action(newOptions);
};

const ButtonGroupBase = ({
  formatDate,
  changedAppointment,
  onRecurrenceOptionsChange,
  readOnly,
  classes,
  className,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  return (
    <MUIButtonGroup
      variant="outlined"
      size="small"
      disabled={readOnly}
      className={classNames(classes.buttonGroup, className)}
      {...restProps}
    >
      <Button
        className={recurrenceOptions.byweekday
          && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SUNDAY) > -1
          ? classes.selectedButton : undefined
        }
        onClick={() => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.SUNDAY,
          onRecurrenceOptionsChange,
        )}
      >
        {formatDate(SUNDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={recurrenceOptions.byweekday
          && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.MONDAY) > -1
          ? classes.selectedButton : undefined
        }
        onClick={() => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.MONDAY,
          onRecurrenceOptionsChange,
        )}
      >
        {formatDate(MONDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={recurrenceOptions.byweekday
          && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.TUESDAY) > -1
          ? classes.selectedButton : undefined
        }
        onClick={() => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.TUESDAY,
          onRecurrenceOptionsChange,
        )}
      >
        {formatDate(TUESDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={recurrenceOptions.byweekday
          && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.WEDNESDAY) > -1
          ? classes.selectedButton : undefined
        }
        onClick={() => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.WEDNESDAY,
          onRecurrenceOptionsChange,
        )}
      >
        {formatDate(WEDNESDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={recurrenceOptions.byweekday
          && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.THURSDAY) > -1
          ? classes.selectedButton : undefined
        }
        onClick={() => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.THURSDAY,
          onRecurrenceOptionsChange,
        )}
      >
        {formatDate(THURSDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={recurrenceOptions.byweekday
          && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.FRIDAY) > -1
          ? classes.selectedButton : undefined
        }
        onClick={() => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.FRIDAY,
          onRecurrenceOptionsChange,
        )}
      >
        {formatDate(FRIDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={recurrenceOptions.byweekday
          && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SATURDAY) > -1
          ? classes.selectedButton : undefined
        }
        onClick={() => handleWeekDaysChange(
          recurrenceOptions,
          DAYS_OF_WEEK.SATURDAY,
          onRecurrenceOptionsChange,
        )}
      >
        {formatDate(SATURDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
    </MUIButtonGroup>
  );
};

ButtonGroupBase.propTypes = {
  changedAppointment: PropTypes.object.isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  formatDate: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

ButtonGroupBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  readOnly: false,
};

export const ButtonGroup = withStyles(styles)(ButtonGroupBase, { name: 'ButtonGroup' });
