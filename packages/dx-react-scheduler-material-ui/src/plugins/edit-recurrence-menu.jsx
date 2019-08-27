import { withComponents } from '@devexpress/dx-react-core';
import { EditRecurrenceMenu as EditRecurrenceMenuBase } from '@devexpress/dx-react-scheduler';
import { Overlay } from '../templates/edit-recurrence-menu/overlay';
import { Layout } from '../templates/edit-recurrence-menu/layout';
import { Button } from '../templates/edit-recurrence-menu/button';
import { Container } from '../templates/edit-recurrence-menu/container';

export const EditRecurrenceMenu = withComponents({
  Layout, Overlay, Button, Container,
})(EditRecurrenceMenuBase);
