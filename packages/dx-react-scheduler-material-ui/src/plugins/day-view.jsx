import * as React from 'react';
import { DayView as DayViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout } from '../templates/views/week-layout';

import { Row } from '../templates/day-view/row';
import { EmptySpace } from '../templates/week-view/empty-space';
import { Container } from '../templates/appointment/container';

import { Layout as TimePanelLayout } from '../templates/day-view/time-panel/layout';
import { Cell as TimePanelCell } from '../templates/day-view/time-panel/cell';

import { Layout as DateTableLayout } from '../templates/week-view/date-table/layout';
import { Cell as DateTableCell } from '../templates/week-view/date-table/cell';

import { Layout as DayPanelLayout } from '../templates/week-view/day-panel/layout';
import { Cell as DayPanelCell } from '../templates/week-view/day-panel/cell';

export class DayView extends React.PureComponent {
  render() {
    return (
      <DayViewBase
        containerComponent={Container}
        layoutComponent={WeekLayout}
        navbarEmptyComponent={EmptySpace}
        timePanelLayoutComponent={TimePanelLayout}
        timePanelCellComponent={TimePanelCell}
        timePanelRowComponent={Row}
        dayPanelLayoutComponent={DayPanelLayout}
        dayPanelCellComponent={DayPanelCell}
        dayPanelRowComponent={Row}
        dateTableLayoutComponent={DateTableLayout}
        dateTableCellComponent={DateTableCell}
        dateTableRowComponent={Row}
        {...this.props}
      />
    );
  }
}

DayView.NavbarEmpty = EmptySpace;
DayView.Container = Container;

DayView.TimePanelLayout = TimePanelLayout;
DayView.TimePanelCell = TimePanelCell;
DayView.TimePanelRow = Row;

DayView.DateTableLayout = DateTableLayout;
DayView.DateTableCell = DateTableCell;
DayView.DateTableRow = Row;
