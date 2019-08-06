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
  classes,
  className,
  onExecute,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  recurrenceOptions,
  onRecurrenceOptionsChange,
  readOnly,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  switcherComponent: Switcher,
  id,
  changedAppointment,
  changeAppointmentField,
  changeAppointment,
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
          recurrenceOptions={recurrenceOptions}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          dateAndTimeEditorComponent={DateAndTimeEditor}
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
          recurrenceOptions={recurrenceOptions}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          dateAndTimeEditorComponent={DateAndTimeEditor}
          changeAppointment={changeAppointment}
          changeAppointmentField={changeAppointmentField}
          changedAppointment={changedAppointment}
          switcherComponent={Switcher}
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
          recurrenceOptions={recurrenceOptions}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          dateAndTimeEditorComponent={DateAndTimeEditor}
          changeAppointment={changeAppointment}
          changeAppointmentField={changeAppointmentField}
          changedAppointment={changedAppointment}
          switcherComponent={Switcher}
          {...restProps}
        />
      );
    default:
      return null;
  }
};


RadioGroupEditor.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

RadioGroupEditor.defaultProps = {
  className: undefined,
  readOnly: false,
};
