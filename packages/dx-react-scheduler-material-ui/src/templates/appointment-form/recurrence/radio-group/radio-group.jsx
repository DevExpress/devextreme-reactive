import * as React from 'react';
import * as PropTypes from 'prop-types';
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
  id,
  ...restProps
}) => {
  switch (id) {
    case END_REPEAT_RADIO_GROUP:
      return (
        <EndRepeatEditor
          readOnly={readOnly}
          getMessage={getMessage}
          textEditorComponent={textEditorComponent}
          labelComponent={labelComponent}
          dateEditorComponent={dateEditorComponent}
          appointmentData={appointmentData}
          onFieldChange={onFieldChange}
          {...restProps}
        />
      );
    case MONTHLY_RADIO_GROUP:
      return (
        <MonthlyEditor
          readOnly={readOnly}
          getMessage={getMessage}
          textEditorComponent={textEditorComponent}
          labelComponent={labelComponent}
          appointmentData={appointmentData}
          selectComponent={selectComponent}
          formatDate={formatDate}
          onFieldChange={onFieldChange}
          {...restProps}
        />
      );
    case YEARLY_RADIO_GROUP:
      return (
        <YearlyEditor
          readOnly={readOnly}
          getMessage={getMessage}
          textEditorComponent={textEditorComponent}
          labelComponent={labelComponent}
          appointmentData={appointmentData}
          selectComponent={selectComponent}
          formatDate={formatDate}
          onFieldChange={onFieldChange}
          {...restProps}
        />
      );
    default:
      return null;
  }
};


RadioGroup.propTypes = {
  getMessage: PropTypes.func.isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  readOnly: PropTypes.bool,
  id: PropTypes.string.isRequired,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  onFieldChange: PropTypes.func,
  formatDate: PropTypes.func,
};

RadioGroup.defaultProps = {
  readOnly: false,
  onFieldChange: () => undefined,
  formatDate: null,
  selectComponent: null,
  dateEditorComponent: null,
};
