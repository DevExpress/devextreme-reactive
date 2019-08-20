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
  getMessage,
  labelComponent,
  textEditorComponent,
  readOnly,
  dateEditorComponent,
  selectComponent,
  id,
  changedAppointment,
  formatDate,
  onAppointmentFieldChange,
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
          changedAppointment={changedAppointment}
          onAppointmentFieldChange={onAppointmentFieldChange}
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
          changedAppointment={changedAppointment}
          selectComponent={selectComponent}
          formatDate={formatDate}
          onAppointmentFieldChange={onAppointmentFieldChange}
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
          changedAppointment={changedAppointment}
          selectComponent={selectComponent}
          formatDate={formatDate}
          onAppointmentFieldChange={onAppointmentFieldChange}
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
  changedAppointment: PropTypes.object.isRequired,
  onAppointmentFieldChange: PropTypes.func,
  formatDate: PropTypes.func,
};

RadioGroup.defaultProps = {
  readOnly: false,
  onAppointmentFieldChange: () => undefined,
  formatDate: null,
  selectComponent: null,
  dateEditorComponent: null,
};
