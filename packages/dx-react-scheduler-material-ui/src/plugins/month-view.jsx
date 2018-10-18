import { withComponents } from '@devexpress/dx-react-core';
import { MonthView as MonthViewBase } from '@devexpress/dx-react-scheduler';
import { HorizontalViewLayout as Layout } from '../templates/layouts/horizontal-view-layout';

import { Row } from '../templates/views/common/row';
import { Container } from '../templates/appointment/container';

import { Layout as DateTableLayout } from '../templates/views/horizontal/date-table/layout';
import { Cell as DateTableCell } from '../templates/views/horizontal/date-table/cell';

import { Layout as DayPanelLayout } from '../templates/views/common/day-scale/layout';
import { Cell as DayPanelCell } from '../templates/views/horizontal/day-scale/cell';

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
