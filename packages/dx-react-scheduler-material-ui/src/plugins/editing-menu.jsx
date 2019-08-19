import { withComponents } from '@devexpress/dx-react-core';
import { EditingMenu as EditingMenuBase } from '@devexpress/dx-react-scheduler';
import { Overlay } from '../templates/editing-menu/overlay';
import { Layout } from '../templates/editing-menu/layout';
import { Button } from '../templates/editing-menu/button';
import { Container } from '../templates/editing-menu/container';

export const EditingMenu = withComponents({
  Layout, Overlay, Button, Container,
})(EditingMenuBase);
