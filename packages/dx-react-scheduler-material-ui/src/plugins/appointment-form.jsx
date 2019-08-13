import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentForm as AppointmentFormBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/appointment-form/layout';
import { TextEditor } from '../templates/appointment-form/common/text-editor';
import { Layout as BasicLayout } from '../templates/appointment-form/basic/layout';
import { Layout as ControlLayout } from '../templates/appointment-form/control/layout';
import { ControlButton } from '../templates/appointment-form/control/control-button';
import { Root } from '../templates/appointment-form/root';
import { DateAndTimeEditor } from '../templates/appointment-form/common/date-and-time-editor';
import { Label } from '../templates/appointment-form/common/label';
import { BooleanEditor } from '../templates/appointment-form/common/boolean-editor';
import { Switcher } from '../templates/appointment-form/common/switcher';
import { Layout as RecurrenceLayout } from '../templates/appointment-form/recurrence/layout';
import { RadioGroupEditor } from '../templates/appointment-form/recurrence/radio-group/radio-group-editor';
import { GroupedButtons } from '../templates/appointment-form/recurrence/grouped-buttons';

export const AppointmentForm = withComponents({
  Root,
  Layout,
  TextEditor,
  BasicLayout,
  ControlLayout,
  ControlButton,
  DateAndTimeEditor,
  Label,
  BooleanEditor,
  Switcher,
  RecurrenceLayout,
  RadioGroupEditor,
  GroupedButtons,
})(AppointmentFormBase);
