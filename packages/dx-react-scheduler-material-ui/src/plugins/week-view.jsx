import { withComponents } from '@devexpress/dx-react-core';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { LayoutContainer } from '../templates/layouts/container';
import { VerticalViewLayout as Layout } from '../templates/layouts/vertical-view-layout';

import { Row } from '../templates/views/common/row';
import { DayScaleEmptyCell } from '../templates/views/vertical/day-scale-empty-cell';
import { Container as AppointmentLayer } from '../templates/appointment/container';

import { Layout as TimeScaleLayout } from '../templates/views/vertical/time-scale/layout';
import { Cell as TimeScaleCell } from '../templates/views/vertical/time-scale/cell';

import { Layout as TimeTableLayout } from '../templates/views/vertical/time-table/layout';
import { Cell as TimeTableCell } from '../templates/views/vertical/time-table/cell';

import { Layout as DayScaleLayout } from '../templates/views/common/day-scale/layout';
import { Cell as DayScaleCell } from '../templates/views/vertical/day-scale/cell';

export const WeekView = withComponents({
  Layout,
  LayoutContainer,
  AppointmentLayer,
  DayScaleEmptyCell,
  TimeScaleLayout,
  TimeScaleCell,
  TimeScaleRow: Row,
  DayScaleLayout,
  DayScaleCell,
  DayScaleRow: Row,
  TimeTableLayout,
  TimeTableCell,
  TimeTableRow: Row,
})(WeekViewBase);
