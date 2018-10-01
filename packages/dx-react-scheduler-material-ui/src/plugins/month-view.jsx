import { withComponents } from '@devexpress/dx-react-core';
import { MonthView as MonthViewBase } from '@devexpress/dx-react-scheduler';
import { HorizontalViewLayout as Layout } from '../templates/views/horizontal-view-layout';

import { Row } from '../templates/month-view/row';

import { Layout as DayPanelLayout } from '../templates/month-view/day-panel/layout';
import { Cell as DayPanelCell } from '../templates/month-view/day-panel/cell';

import { Layout as DateTableLayout } from '../templates/month-view/date-table/layout';
import { Cell as DateTableCell } from '../templates/month-view/date-table/cell';

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
