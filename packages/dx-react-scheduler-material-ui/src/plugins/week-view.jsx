import { withComponents } from '@devexpress/dx-react-core';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout as Layout } from '../templates/views/week-layout';

import { Row } from '../templates/week-view/row';

import { Layout as TimePanelLayout } from '../templates/week-view/time-panel/layout';
import { Cell as TimePanelCell } from '../templates/week-view/time-panel/cell';

import { Layout as DayPanelLayout } from '../templates/week-view/day-panel/layout';
import { Cell as DayPanelCell } from '../templates/week-view/day-panel/cell';

import { Layout as DateTableLayout } from '../templates/week-view/date-table/layout';
import { Cell as DateTableCell } from '../templates/week-view/date-table/cell';

import { Container } from '../templates/appointment/container';

export const WeekView = withComponents({
  Layout,
  Container,
  TimePanelLayout,
  TimePanelCell,
  TimePanelRow: Row,
  DayPanelLayout,
  DayPanelCell,
  DayPanelRow: Row,
  DateTableLayout,
  DateTableCell,
  DateTableRow: Row,
})(WeekViewBase);
