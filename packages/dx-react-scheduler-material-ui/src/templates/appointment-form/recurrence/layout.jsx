import * as React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import {
  END_REPEAT_RADIO_GROUP,
  TITLE,
  getRecurrenceOptions,
  RRULE_REPEAT_TYPES,
  OUTLINED_SELECT,
  getFrequencyString,
  getAvailableRecurrenceOptions,
  handleChangeFrequency,
} from '@devexpress/dx-scheduler-core';
import classNames from 'clsx';
import { Daily as DailyLayout } from './layouts/daily';
import { Weekly as WeeklyLayout } from './layouts/weekly';
import { Monthly as MonthlyLayout } from './layouts/monthly';
import { Yearly as YearlyLayout } from './layouts/yearly';
import { TRANSITIONS_TIME, LAYOUT_MEDIA_QUERY } from '../../constants';

const PREFIX = 'Layout';

export const classes = {
  root: `${PREFIX}-root`,
  visible: `${PREFIX}-visible`,
  invisible: `${PREFIX}-invisible`,
  label: `${PREFIX}-label`,
  repeatLabel: `${PREFIX}-repeatLabel`,
  radioGroup: `${PREFIX}-radioGroup`,
  endRepeatLabel: `${PREFIX}-endRepeatLabel`,
  select: `${PREFIX}-select`,
};

const StyledDiv = styled('div')(({ theme: { spacing } }) => ({
  [`&.${classes.root}`]: {
    padding: 0,
    paddingTop: spacing(3),
    overflow: 'hidden',
    width: 0,
    transition: `all ${TRANSITIONS_TIME}ms cubic-bezier(0, 0, 0.2, 1)`,
    boxSizing: 'border-box',
    maxWidth: 0,
    opacity: 0,
    [`${LAYOUT_MEDIA_QUERY}`]: {
      minWidth: '100%',
      maxHeight: 0,
    },
  },
  [`&.${classes.visible}`]: {
    maxWidth: '500px',
    width: '500px',
    padding: spacing(3),
    paddingRight: spacing(4),
    paddingLeft: spacing(1),
    opacity: 1,
    [`${LAYOUT_MEDIA_QUERY}`]: {
      width: '100%',
      maxWidth: '700px',
      paddingRight: spacing(2),
      paddingLeft: spacing(2),
      maxHeight: 1000,
    },
    '@media (min-width: 700px) and (max-width: 850px)': {
      width: '300px',
    },
    '@media (min-width: 850px) and (max-width: 1000px)': {
      width: '370px',
    },
    '@media (min-width: 1000px) and (max-width: 1150px)': {
      width: '440px',
    },
  },
  [`&.${classes.invisible}`]: {
    maxHeight: 0,
    '@media (min-width: 700px)': {
      maxHeight: '500px',
    },
  },
  [`& .${classes.label}`]: {
    width: '8em',
  },
  [`& .${classes.repeatLabel}`]: {
    marginBottom: spacing(0.375),
  },
  [`& .${classes.radioGroup}`]: {
    marginTop: spacing(0.5),
  },
  [`& .${classes.endRepeatLabel}`]: {
    marginTop: spacing(2),
  },
  [`& .${classes.select}`]: {
    height: '3.8em',
  },
}));

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
  return () => null;
};

export const Layout = ({
  radioGroupComponent: RadioGroup,
  textEditorComponent,
  labelComponent: Label,
  dateEditorComponent,
  selectComponent: Select,
  weeklyRecurrenceSelectorComponent,
  children,
  className,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  formatDate,
  locale,
  visible,
  firstDayOfWeek,
  ...restProps
}) => {
  if (!appointmentData.rRule) {
    return null;
  }
  const recurrenceOptions = getRecurrenceOptions(appointmentData.rRule) || {};
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
    <StyledDiv
      className={classNames({
        [classes.root]: true,
        [classes.visible]: visible,
        [classes.invisible]: !visible,
        className,
      })}
      {...restProps}
    >
      <Label
        text={getMessage('repeatLabel')}
        type={TITLE}
        className={classes.repeatLabel}
      />
      <Select
        onValueChange={changeFrequency}
        availableOptions={selectOptions}
        value={frequency}
        type={OUTLINED_SELECT}
        className={classes.select}
        readOnly={readOnly}
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
        firstDayOfWeek={firstDayOfWeek}
      />
      <Label
        text={getMessage('endRepeatLabel')}
        className={classes.endRepeatLabel}
      />
      <RadioGroup
        className={classes.radioGroup}
        type={END_REPEAT_RADIO_GROUP}
        readOnly={readOnly}
        getMessage={getMessage}
        textEditorComponent={textEditorComponent}
        labelComponent={Label}
        dateEditorComponent={dateEditorComponent}
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        selectComponent={Select}
        formatDate={formatDate}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
      />
      {children}
    </StyledDiv>
  );
};

Layout.propTypes = {
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  weeklyRecurrenceSelectorComponent: PropTypes.oneOfType([
    PropTypes.func, PropTypes.object,
  ]).isRequired,
  onFieldChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
};

Layout.defaultProps = {
  locale: 'en-US',
  onFieldChange: () => undefined,
  className: undefined,
  readOnly: false,
  children: null,
};
