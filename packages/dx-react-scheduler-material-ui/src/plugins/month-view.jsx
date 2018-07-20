import * as React from 'react';
import { MonthView as MonthViewBase } from '@devexpress/dx-react-scheduler';
import { MonthLayout } from '../templates/views/month-layout';

import { Layout as DayPanelLayout } from '../templates/month-view/day-panel/layout';
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
        dayPanelCellComponent={DayPanelCell}
        dayPanelRowComponent={DateTableRow}

        dateTableLayoutComponent={DateTableLayout}
        dateTableRowComponent={DateTableRow}
        dateTableCellComponent={DateTableCell}
        {...this.props}
      />
    );
  }
}

MonthView.DayPanelLayout = DayPanelLayout;
MonthView.DayPanelCell = DayPanelCell;
MonthView.DayPanelRow = DateTableRow;

MonthView.DateTableLayout = DateTableLayout;
MonthView.DateTableRow = DateTableRow;
MonthView.DateTableCell = DateTableCell;
