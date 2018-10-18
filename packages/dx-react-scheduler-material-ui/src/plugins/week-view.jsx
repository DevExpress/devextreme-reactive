import { withComponents } from '@devexpress/dx-react-core';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { VerticalViewLayout as Layout } from '../templates/layouts/vertical-view-layout';

import { Row } from '../templates/views/common/row';
import { DayScaleEmptyCell } from '../templates/views/vertical/day-scale-empty-cell';
import { Container } from '../templates/appointment/container';

import { Layout as TimePanelLayout } from '../templates/views/vertical/time-scale/layout';
import { Cell as TimePanelCell } from '../templates/views/vertical/time-scale/cell';

import { Layout as DateTableLayout } from '../templates/views/vertical/time-table/layout';
import { Cell as DateTableCell } from '../templates/views/vertical/time-table/cell';

import { Layout as DayPanelLayout } from '../templates/views/common/day-scale/layout';
import { Cell as DayPanelCell } from '../templates/views/vertical/day-scale/cell';

export const WeekView = withComponents({
  Layout,
  Container,
  DayScaleEmptyCell,
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
