import { withComponents } from '@devexpress/dx-react-core';
import { MonthView as MonthViewBase } from '@devexpress/dx-react-scheduler';
import { MainLayout as Layout } from '../templates/layouts/main-layout';

import { Row } from '../templates/views/common/row';
import { DayScaleEmptyCell } from '../templates/views/common/day-scale/day-scale-empty-cell';
import { Container as AppointmentLayer } from '../templates/appointment/container';

import { Layout as TimeTableLayout } from '../templates/views/horizontal/time-table/layout';
import { Cell as TimeTableCell } from '../templates/views/horizontal/time-table/cell';

import { Layout as DayScaleLayout } from '../templates/views/common/day-scale/layout';
import { Cell as DayScaleCell } from '../templates/views/horizontal/day-scale/cell';

export const MonthView = withComponents({
  Layout,
  AppointmentLayer,
  DayScaleEmptyCell,
  DayScaleLayout,
  DayScaleCell,
  DayScaleRow: Row,
  TimeTableLayout,
  TimeTableCell,
  TimeTableRow: Row,
})(MonthViewBase);
