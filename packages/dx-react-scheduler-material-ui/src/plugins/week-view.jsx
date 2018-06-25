import * as React from 'react';
import { WeekView as WeekViewBase } from '@devexpress/dx-react-scheduler';
import { WeekLayout } from '../templates/views/week-layout';

import { Layout as TimeScaleLayout } from '../templates/time-scale/layout';
import { Row as TimeScaleRow } from '../templates/time-scale/row';
import { Cell as TimeScaleCell } from '../templates/time-scale/cell';
import { Table as TimeScaleTable } from '../templates/time-scale/table';

export class WeekView extends React.PureComponent {
  render() {
    return (
      <WeekViewBase
        layoutComponent={WeekLayout}
        timeScaleLayoutComponent={TimeScaleLayout}
        timeScaleTableComponent={TimeScaleTable}
        timeScaleRowComponent={TimeScaleRow}
        timeScaleCellComponent={TimeScaleCell}
        {...this.props}
      />
    );
  }
}
