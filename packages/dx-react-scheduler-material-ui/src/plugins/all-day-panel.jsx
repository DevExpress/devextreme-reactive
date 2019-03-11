import { withComponents } from '@devexpress/dx-react-core';
import { AllDayPanel as AllDayPanelBase } from '@devexpress/dx-react-scheduler';
import { Container as AppointmentLayer } from '../templates/appointment/container';
import { Layout } from '../templates/all-day-panel/layout';
import { Cell } from '../templates/all-day-panel/cell';
import { TitleCell } from '../templates/all-day-panel/title-cell';
import { Container } from '../templates/all-day-panel/container';

import { Row } from '../templates/views/common/row';

export const AllDayPanel = withComponents({
  AppointmentLayer, Layout, Cell, Row, TitleCell, Container,
})(AllDayPanelBase);
