import * as React from 'react';
import { DayView as DayViewBase } from '@devexpress/dx-react-scheduler';
import { VerticalViewLayout } from '../templates/views/vertical-view-layout';

import { Row } from '../templates/day-view/row';
import { NavbarEmpty } from '../templates/week-view/navbar-empty';
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
        layoutComponent={VerticalViewLayout}
        navbarEmptyComponent={NavbarEmpty}
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

DayView.NavbarEmpty = NavbarEmpty;
DayView.Container = Container;

DayView.TimePanelLayout = TimePanelLayout;
DayView.TimePanelCell = TimePanelCell;
DayView.TimePanelRow = Row;

DayView.DateTableLayout = DateTableLayout;
DayView.DateTableCell = DateTableCell;
DayView.DateTableRow = Row;

DayView.DayPanelLayout = DayPanelLayout;
DayView.DayPanelCell = DayPanelCell;
DayView.DateTableRow = Row;
