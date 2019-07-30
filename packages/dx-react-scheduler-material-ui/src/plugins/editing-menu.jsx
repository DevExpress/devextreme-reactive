import { withComponents } from '@devexpress/dx-react-core';
import { EditingMenu as EditingMenuBase } from '@devexpress/dx-react-scheduler';
import { Modal } from '../templates/editing-menu/modal';
import { Layout } from '../templates/editing-menu/layout';
import { Button } from '../templates/editing-menu/button';
import { Container } from '../templates/editing-menu/container';

export const EditingMenu = withComponents({ Layout, Modal, Button, Container })(EditingMenuBase);
