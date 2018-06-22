import * as React from 'react';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout } from '../templates/views/week-layout';
import { DateTable } from '../templates/views/date-table';
import { TimeScale } from '../templates/views/time-scale';
import { DayScale } from '../templates/views/day-scale';

export class WeekView extends React.PureComponent {
  render() {
    return (
      <WeekViewBase
        rootComponent={WeekLayout}
        dateTableComponent={DateTable}
        timeScaleComponent={TimeScale}
        dayScaleComponent={DayScale}
        {...this.props}
      />
    );
  }
}

WeekView.Root = WeekLayout;
WeekView.DateTable = DateTable;
WeekView.TimeScale = TimeScale;
WeekView.DayScale = DayScale;
