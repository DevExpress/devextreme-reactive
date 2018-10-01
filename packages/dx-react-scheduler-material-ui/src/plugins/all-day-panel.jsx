import { withComponents } from '@devexpress/dx-react-core';
import { AllDayPanel as AllDayPanelBase } from '@devexpress/dx-react-scheduler';
import { Container } from '../templates/appointment/container';
import { Layout } from '../templates/all-day-panel/layout';
import { Cell } from '../templates/all-day-panel/cell';
import { Row } from '../templates/all-day-panel/row';
import { Title as Text } from '../templates/all-day-panel/title';

export const AllDayPanel = withComponents({
  Container, Layout, Cell, Row, Text,
})(AllDayPanelBase);
