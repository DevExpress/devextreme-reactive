import { withComponents } from '@devexpress/dx-react-core';
import { DayView as DayViewBase } from '@devexpress/dx-react-scheduler';
import { MainLayout as Layout } from '../templates/layouts/main-layout';

import { Row } from '../templates/views/common/row';
import { DayScaleEmptyCell } from '../templates/views/common/day-scale/day-scale-empty-cell';
import { Container as AppointmentLayer } from '../templates/appointment/container';

import { Layout as TimeScaleLayout } from '../templates/views/vertical/time-scale/layout';
import { Label as TimeScaleLabel } from '../templates/views/vertical/time-scale/label';
import { TickCell as TimeScaleTickCell } from '../templates/views/vertical/time-scale/tick-cell';

import { Layout as TimeTableLayout } from '../templates/views/vertical/time-table/layout';
import { Cell as TimeTableCell } from '../templates/views/vertical/time-table/cell';

import { Layout as DayScaleLayout } from '../templates/views/common/day-scale/layout';
import { Cell as DayScaleCell } from '../templates/views/vertical/day-scale/cell';

export const DayView = withComponents({
  Layout,
  AppointmentLayer,
  DayScaleEmptyCell,
  TimeScaleLayout,
  TimeScaleLabel,
  TimeScaleTickCell,
  TimeScaleTicksRow: Row,
  DayScaleLayout,
  DayScaleCell,
  DayScaleRow: Row,
  TimeTableLayout,
  TimeTableCell,
  TimeTableRow: Row,
})(DayViewBase);
