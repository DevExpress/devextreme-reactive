import * as React from 'react';
import PropTypes from 'prop-types';
import {
  END_REPEAT_RADIO_GROUP,
  MONTHLY_RADIO_GROUP,
  YEARLY_RADIO_GROUP,
} from '@devexpress/dx-scheduler-core';
import { EndRepeatEditor } from './end-repeat-editor';
import { MonthlyEditor } from './monthly-editor';
import { YearlyEditor } from './yealy-editor';

export const RadioGroup = ({
  dateEditorComponent,
  textEditorComponent,
  selectComponent,
  labelComponent,
  getMessage,
  readOnly,
  appointmentData,
  formatDate,
  onFieldChange,
  type,
  locale,
  firstDayOfWeek,
  ...restProps
}) => {
  const commonProps = {
    readOnly,
    getMessage,
    textEditorComponent,
    labelComponent,
    appointmentData,
    onFieldChange,
  };
  switch (type) {
    case END_REPEAT_RADIO_GROUP:
      return (
        <EndRepeatEditor
          dateEditorComponent={dateEditorComponent}
          locale={locale}
          {...commonProps}
          {...restProps}
        />
      );
    case MONTHLY_RADIO_GROUP:
      return (
        <MonthlyEditor
          selectComponent={selectComponent}
          formatDate={formatDate}
          firstDayOfWeek={firstDayOfWeek}
          {...commonProps}
          {...restProps}
        />
      );
    case YEARLY_RADIO_GROUP:
      return (
        <YearlyEditor
          selectComponent={selectComponent}
          formatDate={formatDate}
          firstDayOfWeek={firstDayOfWeek}
          {...commonProps}
          {...restProps}
        />
      );
    default:
      return () => null;
  }
};

RadioGroup.propTypes = {
  getMessage: PropTypes.func.isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  readOnly: PropTypes.bool,
  type: PropTypes.string.isRequired,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
};

RadioGroup.defaultProps = {
  locale: undefined,
  readOnly: false,
};
