import { withComponents } from '@devexpress/dx-react-core';
import { EditRecurrenceMenu as EditRecurrenceMenuBase } from '@devexpress/dx-react-scheduler';
import { Overlay } from '../templates/common/dialog/overlay';
import { Layout } from '../templates/edit-recurrence-menu/layout';
import { Button } from '../templates/common/dialog/button';
import { OverlayContainer as Container } from '../templates/common/overlay-container';

export const EditRecurrenceMenu = withComponents({
  Layout, Overlay, Button, Container,
})(EditRecurrenceMenuBase);
