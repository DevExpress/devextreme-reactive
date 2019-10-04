import { withComponents } from '@devexpress/dx-react-core';
import { ConfirmationDialog as ConfirmationDialogBase } from '@devexpress/dx-react-scheduler';
import { Overlay } from '../templates/common/dialog/overlay';
import { Layout } from '../templates/confirmation-dialog/layout';
import { OverlayContainer as Container } from '../templates/common/overlay-container';
import { Button } from '../templates/common/dialog/button';

export const ConfirmationDialog = withComponents({
  Overlay, Layout, Container, Button,
})(ConfirmationDialogBase);
