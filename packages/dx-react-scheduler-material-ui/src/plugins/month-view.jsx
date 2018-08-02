import * as React from 'react';
import { MonthView as MonthViewBase } from '@devexpress/dx-react-scheduler';
import { MonthLayout } from '../templates/views/month-layout';

import { Row } from '../templates/month-view/row';

import { Layout as DayPanelLayout } from '../templates/month-view/day-panel/layout';
import { Cell as DayPanelCell } from '../templates/month-view/day-panel/cell';

import { Layout as DateTableLayout } from '../templates/month-view/date-table/layout';
import { Cell as DateTableCell } from '../templates/month-view/date-table/cell';

export class MonthView extends React.PureComponent {
  render() {
    return (
      <MonthViewBase
        layoutComponent={MonthLayout}

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

MonthView.DayPanelLayout = DayPanelLayout;
MonthView.DayPanelCell = DayPanelCell;
MonthView.DayPanelRow = Row;

MonthView.DateTableLayout = DateTableLayout;
MonthView.DateTableCell = DateTableCell;
MonthView.DateTableRow = Row;
