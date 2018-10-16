import * as React from 'react';
import { DayView as DayViewBase } from '@devexpress/dx-react-scheduler';
import { VerticalViewLayout } from '../templates/layouts/vertical-view-layout';

import { Row } from '../templates/views/common/row';
import { NavbarEmpty } from '../templates/views/vertical/navbar-empty';
import { Container } from '../templates/appointment/container';

import { Layout as TimePanelLayout } from '../templates/views/vertical/time-panel/layout';
import { Cell as TimePanelCell } from '../templates/views/vertical/time-panel/cell';

import { Layout as DateTableLayout } from '../templates/views/vertical/date-table/layout';
import { Cell as DateTableCell } from '../templates/views/vertical/date-table/cell';

import { Layout as DayPanelLayout } from '../templates/views/common/day-panel/layout';
import { Cell as DayPanelCell } from '../templates/views/vertical/day-panel/cell';

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
