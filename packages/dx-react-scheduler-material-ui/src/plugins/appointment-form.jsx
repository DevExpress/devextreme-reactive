import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentForm as AppointmentFormBase } from '@devexpress/dx-react-scheduler';
import { Popup } from '../templates/appointment-form/popup';
import { Container } from '../templates/appointment-form/container';
import { Button } from '../templates/appointment-form/button';
import { Editor } from '../templates/appointment-form/editor';

export const AppointmentForm = withComponents({
  Popup, Container, Button, Editor,
})(AppointmentFormBase);
