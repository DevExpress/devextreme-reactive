import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentForm as AppointmentFormBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/appointment-form/layout';
import { TextEditor } from '../templates/appointment-form/common/text-editor';
import { Layout as BasicLayout } from '../templates/appointment-form/basic/layout';
import { Layout as CommandLayout } from '../templates/appointment-form/command/layout';
import { CommandButton } from '../templates/appointment-form/command/command-button';
import { Overlay } from '../templates/appointment-form/overlay';
import { DateEditor } from '../templates/appointment-form/common/date-editor';
import { Label } from '../templates/appointment-form/common/label';
import { BooleanEditor } from '../templates/appointment-form/common/boolean-editor';
import { Select } from '../templates/common/select/select';
import { Layout as RecurrenceLayout } from '../templates/appointment-form/recurrence/layout';
import { RadioGroup } from '../templates/appointment-form/recurrence/radio-group/radio-group';
import { WeeklyRecurrenceSelector } from '../templates/appointment-form/recurrence/weekly-recurrence-selector';
import { Container } from '../templates/appointment-form/container';

export const AppointmentForm = withComponents({
  Overlay,
  Layout,
  TextEditor,
  BasicLayout,
  CommandLayout,
  CommandButton,
  DateEditor,
  Label,
  BooleanEditor,
  Select,
  RecurrenceLayout,
  RadioGroup,
  WeeklyRecurrenceSelector,
  Container,
})(AppointmentFormBase);
