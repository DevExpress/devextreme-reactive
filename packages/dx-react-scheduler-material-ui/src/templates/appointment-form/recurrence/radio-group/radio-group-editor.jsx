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

export const RadioGroupEditor = ({
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  onRecurrenceOptionsChange,
  readOnly,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  switcherComponent: Switcher,
  id,
  changedAppointment,
  formatDate,
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
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          dateAndTimeEditorComponent={DateAndTimeEditor}
          changedAppointment={changedAppointment}
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
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          changedAppointment={changedAppointment}
          switcherComponent={Switcher}
          dateAndTimeEditorComponent={DateAndTimeEditor}
          formatDate={formatDate}
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
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          changedAppointment={changedAppointment}
          switcherComponent={Switcher}
          formatDate={formatDate}
          {...restProps}
        />
      );
    default:
      return null;
  }
};


RadioGroupEditor.propTypes = {
  getMessage: PropTypes.func.isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  readOnly: PropTypes.bool,
  id: PropTypes.string.isRequired,
  changedAppointment: PropTypes.object.isRequired,
};

RadioGroupEditor.defaultProps = {
  readOnly: false,
};
