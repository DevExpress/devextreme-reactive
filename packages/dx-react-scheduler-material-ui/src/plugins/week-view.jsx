import * as React from 'react';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout } from '../templates/views/week-layout';

import { Layout as TimePanelLayout } from '../templates/time-panel/layout';
import { Row as TimePanelRow } from '../templates/time-panel/row';
import { Cell as TimePanelCell } from '../templates/time-panel/cell';
import { Table as TimePanelTable } from '../templates/time-panel/table';

import { Layout as DayPanelLayout } from '../templates/day-panel/layout';
import { Table as DayPanelTable } from '../templates/day-panel/table';
import { Cell as DayPanelCell } from '../templates/day-panel/cell';

import { Layout as DateTableLayout } from '../templates/date-table/layout';
import { Row as DateTableRow } from '../templates/date-table/row';
import { Cell as DateTableCell } from '../templates/date-table/cell';

export class WeekView extends React.PureComponent {
  render() {
    return (
      <WeekViewBase
        layoutComponent={WeekLayout}
        timePanelLayoutComponent={TimePanelLayout}
        timePanelTableComponent={TimePanelTable}
        timePanelRowComponent={TimePanelRow}
        timePanelCellComponent={TimePanelCell}

        dayPanelLayoutComponent={DayPanelLayout}
        dayPanelTableComponent={DayPanelTable}
        dayPanelCellComponent={DayPanelCell}

        dateTableLayoutComponent={DateTableLayout}
        dateTableRowComponent={DateTableRow}
        dateTableCellComponent={DateTableCell}
        {...this.props}
      />
    );
  }
}

WeekView.TimePanelLayout = TimePanelLayout;
WeekView.TimePanelRow = TimePanelRow;
WeekView.TimePanelCell = TimePanelCell;
WeekView.TimePanelTable = TimePanelTable;

WeekView.DayPanelLayout = DayPanelLayout;
WeekView.DayPanelTable = DayPanelTable;
WeekView.DayPanelCell = DayPanelCell;
WeekView.DayPanelRow = TimePanelRow;

WeekView.DateTableLayout = DateTableLayout;
WeekView.DateTableRow = DateTableRow;
WeekView.DateTableCell = DateTableCell;
