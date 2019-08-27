import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  END_REPEAT_RADIO_GROUP,
  TITLE_LABEL,
  getRecurrenceOptions,
  RRULE_REPEAT_TYPES,
  OUTLINED_SELECT,
  getFrequencyString,
} from '@devexpress/dx-scheduler-core';
import classNames from 'classnames';
import { Daily as DailyLayout } from './layouts/daily';
import { Weekly as WeeklyLayout } from './layouts/weekly';
import { Monthly as MonthlyLayout } from './layouts/monthly';
import { Yearly as YearlyLayout } from './layouts/yearly';
import { getAvailableRecurrenceOptions, handleChangeFrequency } from '../helpers';

const styles = ({ spacing }) => ({
  root: {
    marginRight: spacing(2.875),
    padding: spacing(3),
    paddingRight: 0,
    width: '50%',
    maxWidth: '500px',
    boxSizing: 'border-box',
    '@media (max-width: 700px)': {
      width: '100%',
      maxWidth: '700px',
      paddingRight: spacing(2),
      paddingLeft: spacing(4),
    },
  },
  label: {
    width: '8em',
  },
  repeatLabel: {
    marginBottom: spacing(1),
  },
  radioGroup: {
    marginTop: spacing(0.5),
  },
  endRepeatLabel: {
    marginTop: spacing(2),
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
  selectComponent: Select,
  weeklyRecurrenceSelectorComponent,
  children,
  classes,
  className,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  formatDate,
  locale,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(appointmentData.rRule);
  const MainLayoutComponent = getLayoutComponent(recurrenceOptions);
  const frequency = getFrequencyString(recurrenceOptions.freq);

  const { rRule, startDate } = appointmentData;
  const changeFrequency = React.useCallback(repeatType => handleChangeFrequency(
    repeatType, rRule, startDate, onFieldChange,
  ), [rRule, startDate, onFieldChange]);
  const selectOptions = React.useMemo(
    () => getAvailableRecurrenceOptions(getMessage), [getMessage],
  );
  return (
    <div
      className={classNames(classes.root, className)}
      {...restProps}
    >
      <Label
        text={getMessage('repeatLabel')}
        id={TITLE_LABEL}
        className={classes.repeatLabel}
      />
      <Select
        onValueChange={changeFrequency}
        availableOptions={selectOptions}
        value={frequency}
        id={OUTLINED_SELECT}
      />
      <MainLayoutComponent
        textEditorComponent={textEditorComponent}
        labelComponent={Label}
        getMessage={getMessage}
        readOnly={readOnly}
        radioGroupComponent={RadioGroup}
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        selectComponent={Select}
        weeklyRecurrenceSelectorComponent={weeklyRecurrenceSelectorComponent}
        formatDate={formatDate}
        {...restProps}
      />
      <Label
        text={getMessage('endRepeatLabel')}
        className={classes.endRepeatLabel}
      />
      <RadioGroup
        className={classes.radioGroup}
        id={END_REPEAT_RADIO_GROUP}
        readOnly={readOnly}
        getMessage={getMessage}
        textEditorComponent={textEditorComponent}
        labelComponent={Label}
        dateEditorComponent={dateEditorComponent}
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        locale={locale}
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
  weeklyRecurrenceSelectorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onFieldChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
};

LayoutBase.defaultProps = {
  onFieldChange: () => undefined,
  className: undefined,
  readOnly: false,
  children: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'RecurrenceLayout' });
