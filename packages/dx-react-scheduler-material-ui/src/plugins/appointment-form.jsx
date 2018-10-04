import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentForm as AppointmentFormBase } from '@devexpress/dx-react-scheduler';
import { Popup } from '../templates/appointment-form/popup';
import { CommandButton } from '../templates/appointment-form/command-button';
import { TextEditor } from '../templates/appointment-form/text-editor';
import { DateEditor } from '../templates/appointment-form/date-editor';
import { AllDayEditor } from '../templates/appointment-form/all-day-editor';
import { PopupContainer } from '../templates/appointment-form/popup-container';
import { ScrollableSpace } from '../templates/appointment-form/scrollable-space';
import { StaticSpace } from '../templates/appointment-form/static-space';

export const AppointmentForm = withComponents({
  Popup,
  CommandButton,
  TextEditor,
  DateEditor,
  AllDayEditor,
  PopupContainer,
  ScrollableSpace,
  StaticSpace,
})(AppointmentFormBase);
