import { withComponents } from '@devexpress/dx-react-core';
import { DayView as DayViewBase } from '@devexpress/dx-react-scheduler';
import { VerticalViewLayout as Layout } from '../templates/layouts/vertical-view-layout';

import { Row } from '../templates/views/common/row';
import { DayScaleEmptyCell } from '../templates/views/vertical/day-scale-empty-cell';
import { Container } from '../templates/appointment/container';

import { Layout as TimeScaleLayout } from '../templates/views/vertical/time-scale/layout';
import { Cell as TimeScaleCell } from '../templates/views/vertical/time-scale/cell';

import { Layout as DateTableLayout } from '../templates/views/vertical/date-table/layout';
import { Cell as DateTableCell } from '../templates/views/vertical/date-table/cell';

import { Layout as DayScaleLayout } from '../templates/views/common/day-scale/layout';
import { Cell as DayScaleCell } from '../templates/views/vertical/day-scale/cell';


export const DayView = withComponents({
  Layout,
  Container,
  DayScaleEmptyCell,
  TimeScaleLayout,
  TimeScaleCell,
  TimeScaleRow: Row,
  DayScaleLayout,
  DayScaleCell,
  DayScaleRow: Row,
  DateTableLayout,
  DateTableCell,
  DateTableRow: Row,
})(DayViewBase);
