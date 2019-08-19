import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  END_REPEAT_RADIO_GROUP,
  TITLE_LABEL,
  getRecurrenceOptions,
  RRULE_REPEAT_TYPES,
  OUTLINED_SWITCHER,
  getFrequencyString,
} from '@devexpress/dx-scheduler-core';
import classNames from 'classnames';
import { Daily as DailyLayout } from './layouts/daily';
import { Weekly as WeeklyLayout } from './layouts/weekly';
import { Monthly as MonthlyLayout } from './layouts/monthly';
import { Yearly as YearlyLayout } from './layouts/yearly';
import { getAvailableRecurrenceOptions, handleChangeFrequency } from '../helpers';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    padding: theme.spacing(3),
    paddingRight: 0,
    width: '50%',
  },
  label: {
    width: '8em',
  },
  repeatLabel: {
    marginBottom: theme.spacing(1),
  },
  radioGroup: {
    marginTop: theme.spacing(0.5),
  },
  endRepeatLabel: {
    marginTop: theme.spacing(2),
  },
});

const getLayoutComponent = (recurrenceOptions) => {
  if (recurrenceOptions) {
    switch (recurrenceOptions.freq) {
      case RRULE_REPEAT_TYPES.DAILY:
        return DailyLayout;
      case RRULE_REPEAT_TYPES.WEEKLY:
        return WeeklyLayout;
      case RRULE_REPEAT_TYPES.MONTHLY:
        return MonthlyLayout;
      case RRULE_REPEAT_TYPES.YEARLY:
        return YearlyLayout;
      default:
        break;
    }
  }
  return null;
};

const LayoutBase = ({
  radioGroupComponent: RadioGroup,
  textEditorComponent,
  labelComponent: Label,
  dateEditorComponent,
  onRecurrenceOptionsChange,
  selectComponent: Select,
  buttonGroupComponent,
  children,
  classes,
  className,
  getMessage,
  readOnly,
  onAppointmentFieldChange,
  changedAppointment,
  formatDate,
  ...restProps
}) => {
  let MainLayoutComponent = null;
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);

  MainLayoutComponent = getLayoutComponent(recurrenceOptions);
  const frequency = getFrequencyString(recurrenceOptions.freq);
  return (
    <div
      className={classNames(classes.root, className)}
      {...restProps}
    >
      <Label
        label={getMessage('repeatLabel')}
        id={TITLE_LABEL}
        className={classes.repeatLabel}
      />
      <Select
        onChange={repeatType => handleChangeFrequency(
          repeatType, changedAppointment, onAppointmentFieldChange,
        )}
        availableOptions={getAvailableRecurrenceOptions(getMessage)}
        value={frequency}
        id={OUTLINED_SWITCHER}
      />
      <MainLayoutComponent
        textEditorComponent={textEditorComponent}
        labelComponent={Label}
        onRecurrenceOptionsChange={onRecurrenceOptionsChange}
        getMessage={getMessage}
        readOnly={readOnly}
        radioGroupComponent={RadioGroup}
        changedAppointment={changedAppointment}
        onAppointmentFieldChange={onAppointmentFieldChange}
        selectComponent={Select}
        buttonGroupComponent={buttonGroupComponent}
        formatDate={formatDate}
        {...restProps}
      />
      <Label
        label={getMessage('endRepeatLabel')}
        className={classes.endRepeatLabel}
      />
      <RadioGroup
        className={classes.radioGroup}
        id={END_REPEAT_RADIO_GROUP}
        readOnly={readOnly}
        getMessage={getMessage}
        textEditorComponent={textEditorComponent}
        labelComponent={Label}
        onRecurrenceOptionsChange={onRecurrenceOptionsChange}
        dateAndTimeEditorComponent={dateEditorComponent}
        changedAppointment={changedAppointment}
      />
      {children}
    </div>
  );
};

LayoutBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  buttonGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  changedAppointment: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
};

LayoutBase.defaultProps = {
  className: undefined,
  onRecurrenceOptionsChange: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });