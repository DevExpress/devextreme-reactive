import * as React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import {
  MONTHLY_RADIO_GROUP,
  getRecurrenceOptions,
  changeRecurrenceOptions,
  checkIsNaturalNumber,
} from '@devexpress/dx-scheduler-core';
import { IntervalEditor } from './interval-editor';

const PREFIX = 'Monthly';

export const classes = {
  container: `${PREFIX}-container`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    marginBottom: theme.spacing(1),
  },
}));

export const Monthly = ({
  radioGroupComponent: RadioGroup,
  textEditorComponent,
  labelComponent,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  selectComponent,
  weeklyRecurrenceSelectorComponent,
  formatDate,
  firstDayOfWeek,
  ...restProps
}) => {
  const { rRule } = appointmentData;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule) || {}, [rRule]);

  const changeRecurrenceInterval = React.useCallback(
    interval => checkIsNaturalNumber(interval) && onFieldChange({
      rRule: changeRecurrenceOptions({ ...recurrenceOptions, interval }),
    }), [recurrenceOptions, onFieldChange],
  );
  return (
    <StyledDiv {...restProps}>
      <IntervalEditor
        className={classes.container}
        repeatEveryLabel={getMessage('repeatEveryLabel')}
        repeatIntervalLabel={getMessage('monthsLabel')}
        textEditorComponent={textEditorComponent}
        labelComponent={labelComponent}
        changeRecurrenceInterval={changeRecurrenceInterval}
        interval={recurrenceOptions.interval}
        readOnly={readOnly}
        {...restProps}
      />
      <RadioGroup
        type={MONTHLY_RADIO_GROUP}
        readOnly={readOnly}
        getMessage={getMessage}
        textEditorComponent={textEditorComponent}
        labelComponent={labelComponent}
        onFieldChange={onFieldChange}
        appointmentData={appointmentData}
        selectComponent={selectComponent}
        formatDate={formatDate}
        dateEditorComponent={() => null}
        firstDayOfWeek={firstDayOfWeek}
      />
    </StyledDiv>
  );
};

Monthly.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  weeklyRecurrenceSelectorComponent: PropTypes.oneOfType([
    PropTypes.func, PropTypes.object,
  ]).isRequired,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  onFieldChange: PropTypes.func,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  formatDate: PropTypes.func.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
};

Monthly.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
};
