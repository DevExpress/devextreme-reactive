import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentForm as AppointmentFormBase } from '@devexpress/dx-react-scheduler';
import { Popup } from '../templates/appointment-form/popup';
import { CommandButton } from '../templates/appointment-form/command-button';
import { TextEditor } from '../templates/appointment-form/text-editor';
import { DateEditor } from '../templates/appointment-form/date-editor';
import { BooleanEditor } from '../templates/appointment-form/boolean-editor';
import { Container } from '../templates/appointment-form/container';
import { ScrollableArea } from '../templates/appointment-form/scrollable-area';
import { StaticArea } from '../templates/appointment-form/static-area';

export const AppointmentForm = withComponents({
  Popup,
  CommandButton,
  TitleEditor: TextEditor,
  StartDateEditor: DateEditor,
  EndDateEditor: DateEditor,
  AllDayEditor: BooleanEditor,
  Container,
  ScrollableArea,
  StaticArea,
})(AppointmentFormBase);
