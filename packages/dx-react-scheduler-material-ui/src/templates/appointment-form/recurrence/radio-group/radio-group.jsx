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
  labelComponent: Label,
  textEditorComponent: TextEditor,
  readOnly,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  switcherComponent: Switcher,
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
          textEditorComponent={TextEditor}
          labelComponent={Label}
          dateAndTimeEditorComponent={DateAndTimeEditor}
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
          textEditorComponent={TextEditor}
          labelComponent={Label}
          changedAppointment={changedAppointment}
          switcherComponent={Switcher}
          dateAndTimeEditorComponent={DateAndTimeEditor}
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
          textEditorComponent={TextEditor}
          labelComponent={Label}
          changedAppointment={changedAppointment}
          switcherComponent={Switcher}
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
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  readOnly: PropTypes.bool,
  id: PropTypes.string.isRequired,
  changedAppointment: PropTypes.object.isRequired,
  onAppointmentFieldChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  readOnly: false,
  onAppointmentFieldChange: () => undefined,
};
