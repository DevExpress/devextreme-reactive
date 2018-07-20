import * as React from 'react';
import { MonthView as MonthViewBase } from '@devexpress/dx-react-scheduler';
import { MonthLayout } from '../templates/views/month-layout';

import { Row as TimePanelRow } from '../templates/time-panel/row';

import { Layout as DayPanelLayout } from '../templates/month-view/day-panel/layout';
import { Table as DayPanelTable } from '../templates/month-view/day-panel/table';
import { Cell as DayPanelCell } from '../templates/month-view/day-panel/cell';

import { Layout as DateTableLayout } from '../templates/month-view/date-table/layout';
import { Row as DateTableRow } from '../templates/month-view/date-table/row';
import { Cell as DateTableCell } from '../templates/month-view/date-table/cell';

export class MonthView extends React.PureComponent {
  render() {
    return (
      <MonthViewBase
        layoutComponent={MonthLayout}

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

MonthView.DayPanelLayout = DayPanelLayout;
MonthView.DayPanelTable = DayPanelTable;
MonthView.DayPanelCell = DayPanelCell;
MonthView.DayPanelRow = TimePanelRow;

MonthView.DateTableLayout = DateTableLayout;
MonthView.DateTableRow = DateTableRow;
MonthView.DateTableCell = DateTableCell;
