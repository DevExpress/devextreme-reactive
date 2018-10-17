import { withComponents } from '@devexpress/dx-react-core';
import { AllDayPanel as AllDayPanelBase } from '@devexpress/dx-react-scheduler';
import { Container } from '../templates/appointment/container';
import { Layout } from '../templates/all-day-panel/layout';
import { Cell } from '../templates/all-day-panel/cell';
import { Title as Text } from '../templates/all-day-panel/title';

import { Row } from '../templates/views/common/row';

export const AllDayPanel = withComponents({
  Container, Layout, Cell, Row, Text,
})(AllDayPanelBase);
