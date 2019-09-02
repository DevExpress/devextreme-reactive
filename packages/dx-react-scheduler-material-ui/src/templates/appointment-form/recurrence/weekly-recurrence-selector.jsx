import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  getRecurrenceOptions, DAYS_OF_WEEK, SUNDAY_DATE, WEEK_DAY_OPTIONS, MONDAY_DATE,
  TUESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE, WEDNESDAY_DATE,
  handleWeekDaysChange, changeRecurrenceOptions,
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
  button: {
    minWidth: spacing(3),
  },
  buttonGroup: {
    marginBottom: spacing(2),
  },
});

const WeeklyRecurrenceSelectorBase = React.memo(({
  formatDate,
  rRule,
  readOnly,
  classes,
  className,
  onFieldChange,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(rRule);
  return (
    <ButtonGroup
      variant="outlined"
      size="small"
      disabled={readOnly}
      className={classNames(classes.buttonGroup, className)}
      fullWidth
      {...restProps}
    >
      <Button
        className={classNames({
          [classes.button]: true,
          [classes.selectedButton]: recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SUNDAY) > -1,
        })}
        onClick={() => onFieldChange({
          rRule: changeRecurrenceOptions(handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.SUNDAY,
            onFieldChange,
          )),
        })}
      >
        {formatDate(SUNDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={classNames({
          [classes.button]: true,
          [classes.selectedButton]: recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.MONDAY) > -1,
        })}
        onClick={() => onFieldChange({
          rRule: changeRecurrenceOptions(handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.MONDAY,
            onFieldChange,
          )),
        })}
      >
        {formatDate(MONDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={classNames({
          [classes.button]: true,
          [classes.selectedButton]: recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.TUESDAY) > -1,
        })}
        onClick={() => onFieldChange({
          rRule: changeRecurrenceOptions(handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.TUESDAY,
            onFieldChange,
          )),
        })}
      >
        {formatDate(TUESDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={classNames({
          [classes.button]: true,
          [classes.selectedButton]: recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.WEDNESDAY) > -1,
        })}
        onClick={() => onFieldChange({
          rRule: changeRecurrenceOptions(handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.WEDNESDAY,
            onFieldChange,
          )),
        })}
      >
        {formatDate(WEDNESDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={classNames({
          [classes.button]: true,
          [classes.selectedButton]: recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.THURSDAY) > -1,
        })}
        onClick={() => onFieldChange({
          rRule: changeRecurrenceOptions(handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.THURSDAY,
            onFieldChange,
          )),
        })}
      >
        {formatDate(THURSDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={classNames({
          [classes.button]: true,
          [classes.selectedButton]: recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.FRIDAY) > -1,
        })}
        onClick={() => onFieldChange({
          rRule: changeRecurrenceOptions(handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.FRIDAY,
            onFieldChange,
          )),
        })}
      >
        {formatDate(FRIDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
      <Button
        className={classNames({
          [classes.button]: true,
          [classes.selectedButton]: recurrenceOptions.byweekday
            && recurrenceOptions.byweekday.indexOf(DAYS_OF_WEEK.SATURDAY) > -1,
        })}
        onClick={() => onFieldChange({
          rRule: changeRecurrenceOptions(handleWeekDaysChange(
            recurrenceOptions,
            DAYS_OF_WEEK.SATURDAY,
            onFieldChange,
          )),
        })}
      >
        {formatDate(SATURDAY_DATE, WEEK_DAY_OPTIONS)}
      </Button>
    </ButtonGroup>
  );
});

WeeklyRecurrenceSelectorBase.propTypes = {
  rRule: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func,
  formatDate: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

WeeklyRecurrenceSelectorBase.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
  className: undefined,
};

export const WeeklyRecurrenceSelector = withStyles(styles)(WeeklyRecurrenceSelectorBase, { name: 'WeeklyRecurrenceSelector' });
