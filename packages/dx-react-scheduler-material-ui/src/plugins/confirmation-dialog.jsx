import { withComponents } from '@devexpress/dx-react-core';
import { ConfirmationDialog as ConfirmationDialogBase } from '@devexpress/dx-react-scheduler';
import { Overlay } from '../templates/confirmation-dialog/overlay';
import { Layout } from '../templates/confirmation-dialog/layout';
import { Container } from '../templates/confirmation-dialog/container';
import { Button } from '../templates/confirmation-dialog/button'

export const ConfirmationDialog = withComponents({
  Overlay, Layout, Container, Button,
})(ConfirmationDialogBase);
