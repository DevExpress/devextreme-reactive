import * as React from 'react';
import { DayView as DayViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout } from '../templates/views/week-layout';

import { Row } from '../templates/day-view/row';
import { EmptySpace } from '../templates/day-view/empty-space';

import { Layout as TimePanelLayout } from '../templates/day-view/time-panel/layout';
import { Cell as TimePanelCell } from '../templates/day-view/time-panel/cell';

import { Layout as DateTableLayout } from '../templates/day-view/date-table/layout';
import { Cell as DateTableCell } from '../templates/day-view/date-table/cell';

export class DayView extends React.PureComponent {
  render() {
    return (
      <DayViewBase
        layoutComponent={WeekLayout}
        emptySpaceComponent={EmptySpace}
        timePanelLayoutComponent={TimePanelLayout}
        timePanelCellComponent={TimePanelCell}
        timePanelRowComponent={Row}
        dayPanelRowComponent={Row}
        dateTableLayoutComponent={DateTableLayout}
        dateTableCellComponent={DateTableCell}
        dateTableRowComponent={Row}
        {...this.props}
      />
    );
  }
}

DayView.TimePanelLayout = TimePanelLayout;
DayView.TimePanelCell = TimePanelCell;
DayView.TimePanelRow = Row;

DayView.DateTableLayout = DateTableLayout;
DayView.DateTableCell = DateTableCell;
DayView.DateTableRow = Row;
