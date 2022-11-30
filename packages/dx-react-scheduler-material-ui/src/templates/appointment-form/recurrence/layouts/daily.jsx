import * as React from 'react';
import PropTypes from 'prop-types';
import {
  getRecurrenceOptions,
  changeRecurrenceOptions,
  checkIsNaturalNumber,
} from '@devexpress/dx-scheduler-core';
import { IntervalEditor } from './interval-editor';

export const Daily = ({
  weeklyRecurrenceSelectorComponent,
  radioGroupComponent,
  textEditorComponent,
  labelComponent,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  selectComponent,
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
    <IntervalEditor
      repeatEveryLabel={getMessage('repeatEveryLabel')}
      repeatIntervalLabel={getMessage('daysLabel')}
      textEditorComponent={textEditorComponent}
      labelComponent={labelComponent}
      changeRecurrenceInterval={changeRecurrenceInterval}
      interval={recurrenceOptions.interval}
      readOnly={readOnly}
      {...restProps}
    />
  );
};

Daily.propTypes = {
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

Daily.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
};
