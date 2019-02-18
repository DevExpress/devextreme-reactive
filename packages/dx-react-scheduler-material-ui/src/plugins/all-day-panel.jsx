import { withComponents } from '@devexpress/dx-react-core';
import { AllDayPanel as AllDayPanelBase } from '@devexpress/dx-react-scheduler';
import { Container as AppointmentLayer } from '../templates/appointment/container';
import { Layout } from '../templates/all-day-panel/layout';
import { Cell } from '../templates/all-day-panel/cell';
// import { Cell } from '../templates/views/vertical/time-table/cell';
import { TitleCell } from '../templates/all-day-panel/title-cell';

import { Row } from '../templates/views/common/row';

export const AllDayPanel = withComponents({
  AppointmentLayer, Layout, Cell, Row, TitleCell,
})(AllDayPanelBase);
