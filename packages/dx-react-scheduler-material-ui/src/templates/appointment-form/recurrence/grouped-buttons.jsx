import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getRecurrenceOptions, DAYS_OF_WEEK } from '@devexpress/dx-scheduler-core';
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

const GroupedButtonsBase = ({
  getMessage,
  changedAppointment,
  onRecurrenceOptionsChange,
  readOnly,
  classes,
  className,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  return (
    <ButtonGroup
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
        {getMessage('sunLabel')}
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
        {getMessage('monLabel')}
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
        {getMessage('tueLabel')}
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
        {getMessage('wedLabel')}
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
        {getMessage('thuLabel')}
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
        {getMessage('friLabel')}
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
        {getMessage('satLabel')}
      </Button>
    </ButtonGroup>
  );
};

GroupedButtonsBase.propTypes = {
  changedAppointment: PropTypes.object.isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

GroupedButtonsBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  readOnly: false,
};

export const GroupedButtons = withStyles(styles)(GroupedButtonsBase, { name: 'GroupedButtons' });
