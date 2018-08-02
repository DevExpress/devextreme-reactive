import * as React from 'react';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout } from '../templates/views/week-layout';

import { Row } from '../templates/week-view/row';

import { Layout as TimePanelLayout } from '../templates/week-view/time-panel/layout';
import { Cell as TimePanelCell } from '../templates/week-view/time-panel/cell';

import { Layout as DayPanelLayout } from '../templates/week-view/day-panel/layout';
import { Cell as DayPanelCell } from '../templates/week-view/day-panel/cell';

import { Layout as DateTableLayout } from '../templates/week-view/date-table/layout';
import { Cell as DateTableCell } from '../templates/week-view/date-table/cell';

export class WeekView extends React.PureComponent {
  render() {
    return (
      <WeekViewBase
        layoutComponent={WeekLayout}
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

WeekView.TimePanelLayout = TimePanelLayout;
WeekView.TimePanelCell = TimePanelCell;
WeekView.TimePanelRow = Row;

WeekView.DayPanelLayout = DayPanelLayout;
WeekView.DayPanelCell = DayPanelCell;
WeekView.DayPanelRow = Row;

WeekView.DateTableLayout = DateTableLayout;
WeekView.DateTableCell = DateTableCell;
WeekView.DateTableRow = Row;
