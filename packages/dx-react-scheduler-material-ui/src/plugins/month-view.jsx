import { withComponents } from '@devexpress/dx-react-core';
import { MonthView as MonthViewBase } from '@devexpress/dx-react-scheduler';
import { HorizontalViewLayout as Layout } from '../templates/views/horizontal-view-layout';

import { Row } from '../templates/horizontal-view/row';

import { Layout as DayPanelLayout } from '../templates/horizontal-view/day-panel/layout';
import { Cell as DayPanelCell } from '../templates/horizontal-view/day-panel/cell';

import { Layout as DateTableLayout } from '../templates/horizontal-view/date-table/layout';
import { Cell as DateTableCell } from '../templates/horizontal-view/date-table/cell';

import { Container } from '../templates/appointment/container';

export const MonthView = withComponents({
  Layout,
  Container,
  DayPanelLayout,
  DayPanelCell,
  DayPanelRow: Row,
  DateTableLayout,
  DateTableCell,
  DateTableRow: Row,
})(MonthViewBase);
