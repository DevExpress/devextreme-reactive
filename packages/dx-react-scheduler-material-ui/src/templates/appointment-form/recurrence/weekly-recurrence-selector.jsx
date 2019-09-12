import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  getRecurrenceOptions, DAYS_OF_WEEK_ARRAY, WEEK_DAY_OPTIONS,
  handleWeekDaysChange, changeRecurrenceOptions, DAYS_OF_WEEK_DATES,
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

const isCurrentWeekDay = (recurrenceOptions, weekDay) => recurrenceOptions.byweekday
  && recurrenceOptions.byweekday.indexOf(weekDay) > -1;

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
      {
        DAYS_OF_WEEK_ARRAY.map((dayOfWeek, index) => (
          <Button
            className={classNames({
              [classes.button]: true,
              [classes.selectedButton]: isCurrentWeekDay(recurrenceOptions, dayOfWeek),
            })}
            key={dayOfWeek}
            onClick={() => onFieldChange({
              rRule: changeRecurrenceOptions(handleWeekDaysChange(
                recurrenceOptions,
                dayOfWeek,
                onFieldChange,
              )),
            })}
          >
            {formatDate(DAYS_OF_WEEK_DATES[index], WEEK_DAY_OPTIONS)}
          </Button>
        ))
      }
    </ButtonGroup>
  );
});

WeeklyRecurrenceSelectorBase.propTypes = {
  formatDate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  rRule: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
};

WeeklyRecurrenceSelectorBase.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
  className: undefined,
};

export const WeeklyRecurrenceSelector = withStyles(styles)(WeeklyRecurrenceSelectorBase, { name: 'WeeklyRecurrenceSelector' });
