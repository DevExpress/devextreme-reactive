import * as React from 'react';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout } from '../templates/views/week-layout';

import { Layout as TimeScaleLayout } from '../templates/time-scale/layout';
import { Row as TimeScaleRow } from '../templates/time-scale/row';
import { Cell as TimeScaleCell } from '../templates/time-scale/cell';
import { Table as TimeScaleTable } from '../templates/time-scale/table';

import { Layout as DayScaleLayout } from '../templates/day-scale/layout';
import { Table as DayScaleTable } from '../templates/day-scale/table';
import { Cell as DayScaleCell } from '../templates/day-scale/cell';

import { Layout as DateTableLayout } from '../templates/date-table/layout';
import { Row as DateTableRow } from '../templates/date-table/row';
import { Cell as DateTableCell } from '../templates/date-table/cell';
import { Table as DateTableTable } from '../templates/date-table/table';

export class WeekView extends React.PureComponent {
  render() {
    return (
      <WeekViewBase
        layoutComponent={WeekLayout}
        timeScaleLayoutComponent={TimeScaleLayout}
        timeScaleTableComponent={TimeScaleTable}
        timeScaleRowComponent={TimeScaleRow}
        timeScaleCellComponent={TimeScaleCell}

        dayScaleLayoutComponent={DayScaleLayout}
        dayScaleTableComponent={DayScaleTable}
        dayScaleCellComponent={DayScaleCell}

        dateTableLayoutComponent={DateTableLayout}
        dateTableTableComponent={DateTableTable}
        dateTableRowComponent={DateTableRow}
        dateTableCellComponent={DateTableCell}

        {...this.props}
      />
    );
  }
}
