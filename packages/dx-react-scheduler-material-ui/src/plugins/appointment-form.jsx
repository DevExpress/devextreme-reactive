import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentForm as AppointmentFormBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/appointment-form/layout';
import { TextEditor } from '../templates/appointment-form/basic/text-editor';
import { Layout as BasicLayout } from '../templates/appointment-form/basic/layout';
import { Layout as ControlLayout } from '../templates/appointment-form/control/layout';
import { SaveButton } from '../templates/appointment-form/control/save-button';
import { DeleteButton } from '../templates/appointment-form/control/delete-button';
import { CloseButton as CancelButton } from '../templates/appointment-form/control/close-button';
import { Root } from '../templates/appointment-form/root';
import { DateAndTimeEditor } from '../templates/appointment-form/common/date-and-time-editor';
import { Label } from '../templates/appointment-form/common/label';
import { BooleanEditor } from '../templates/appointment-form/common/boolean-editor';
import { Switcher } from '../templates/appointment-form/common/switcher';
import { Layout as RecurrenceLayout } from '../templates/appointment-form/recurrence/layout';
import { RadioGroupEditor } from '../templates/appointment-form/recurrence/radio-group-editor';

export const AppointmentForm = withComponents({
  Root,
  Layout,
  TextEditor,
  BasicLayout,
  ControlLayout,
  SaveButton,
  DeleteButton,
  CancelButton,
  DateAndTimeEditor,
  Label,
  BooleanEditor,
  Switcher,
  RecurrenceLayout,
  RadioGroupEditor,
})(AppointmentFormBase);
